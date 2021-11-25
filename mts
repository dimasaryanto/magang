apiVersion: apps/v1
kind: Deployment
metadata:
  name: mtsdiy
  namespace: mts-diy
  labels:
    app: mtsdiy
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mtsdiy
  template:
    metadata:
      labels:
        app: mtsdiy
    spec:
      containers:
      - name: mtsdiy
        image: 131100/mts:v1
---
apiVersion: v1
kind: Service
metadata:
  name: mtsdiy-svc
  namespace: mts-diy
spec:
  type: ClusterIP
  ports:
  - port: 80
  selector:
    app: mtsdiy
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: mtsdiy-ing
  namespace: mts-diy
  annotations:
    kubernetes.io/ingress.class: nginx
spec:
  rules:
  - host: mts-diy.test.geschool.id
    http:
      paths:
      - pathType: Prefix
        path: /
        backend:
          service:
            name: mtsdiy-svc
            port:
              number: 80
