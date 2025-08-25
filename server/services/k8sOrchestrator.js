const fs = require('fs');
const path = require('path');
const yaml = require('yaml');
const { KubeConfig, CoreV1Api, AppsV1Api, NetworkingV1Api } = require('@kubernetes/client-node');
const User = require('../models/User');

// Loads kubeconfig either from in-cluster or default location
function createK8sClients() {
    const kubeconfig = new KubeConfig();
    const saCert = '/var/run/secrets/kubernetes.io/serviceaccount/ca.crt';
    const saToken = '/var/run/secrets/kubernetes.io/serviceaccount/token';

    const inClusterEnv = !!process.env.KUBERNETES_SERVICE_HOST;
    const inClusterFilesPresent = fs.existsSync(saCert) && fs.existsSync(saToken);

    if (inClusterEnv && inClusterFilesPresent) {
        kubeconfig.loadFromCluster();
    } else {
        // Use local kubeconfig (e.g., Minikube context) when running outside K8s
        // Honors KUBECONFIG env or defaults to ~/.kube/config
        kubeconfig.loadFromDefault();
    }
    const coreV1Api = kubeconfig.makeApiClient(CoreV1Api);
    const appsV1Api = kubeconfig.makeApiClient(AppsV1Api);
    const networkingV1Api = kubeconfig.makeApiClient(NetworkingV1Api);
    return { coreV1Api, appsV1Api, networkingV1Api };
}

function readAndRenderTemplate(filePath, replacements) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const docs = yaml.parseAllDocuments(fileContent).map((doc) => {
        let docString = doc.toString();
        for (const [key, value] of Object.entries(replacements)) {
            const regex = new RegExp(key, 'g');
            docString = docString.replace(regex, value);
        }
        return yaml.parse(docString);
    });
    return docs;
}

async function createWorkspace({ userId, name, image, containerPort, serviceType = process.env.K8S_SERVICE_TYPE || 'ingress', namespace = process.env.K8S_NAMESPACE || 'default' }) {
    const { coreV1Api, appsV1Api, networkingV1Api } = createK8sClients();
    const templatePath = path.join(__dirname, '..', 'k8s', serviceType === 'nodeport' ? 'service-nodeport.yaml' : 'service.yaml');
    const user = await User.findById(userId).exec();
    const servicePassword = `${user.username}_${user.password}`;
    const docs = readAndRenderTemplate(templatePath, {
        service_name: name,
        container_image: image,
        container_port: String(containerPort || 6901),
        ingress_class: process.env.INGRESS_CLASS || 'nginx',
        ingress_domain: process.env.INGRESS_BASE_DOMAIN || '127.0.0.1.nip.io',
        service_password: servicePassword,
    });

    for (const manifest of docs) {
        if (!manifest || !manifest.kind) continue;
        switch (manifest.kind) {
            case 'Deployment':
                try {
                    await appsV1Api.createNamespacedDeployment(namespace, manifest);
                } catch (e) {
                    if (e?.response?.statusCode === 409) {
                        await appsV1Api.replaceNamespacedDeployment(manifest.metadata.name, namespace, manifest);
                    } else {
                        throw e;
                    }
                }
                break;
            case 'Service':
                try {
                    await coreV1Api.createNamespacedService(namespace, manifest);
                } catch (e) {
                    if (e?.response?.statusCode === 409) {
                        await coreV1Api.replaceNamespacedService(manifest.metadata.name, namespace, manifest);
                    } else {
                        throw e;
                    }
                }
                break;
            case 'Ingress':
                if (serviceType === 'nodeport') break;
                try {
                    await networkingV1Api.createNamespacedIngress(namespace, manifest);
                } catch (e) {
                    if (e?.response?.statusCode === 409) {
                        await networkingV1Api.replaceNamespacedIngress(manifest.metadata.name, namespace, manifest);
                    } else {
                        throw e;
                    }
                }
                break;
            default:
                break;
        }
    }
    if (serviceType === 'nodeport') {
        const svc = await coreV1Api.readNamespacedService(name, namespace);
        const ports = svc?.body?.spec?.ports || [];
        const nodePort = ports.find(p => p.name === 'vnc')?.nodePort || ports[0]?.nodePort;
        return { nodePort };
    }
}

async function deleteWorkspace({ name, namespace = process.env.K8S_NAMESPACE || 'default' }) {
    const { coreV1Api, appsV1Api, networkingV1Api } = createK8sClients();
    // Delete Ingress, Service, Deployment if exist
    try { await networkingV1Api.deleteNamespacedIngress(name, namespace); } catch (_) {}
    try { await coreV1Api.deleteNamespacedService(name, namespace); } catch (_) {}
    try { await appsV1Api.deleteNamespacedDeployment(name, namespace); } catch (_) {}
}

module.exports = { createWorkspace, deleteWorkspace };


