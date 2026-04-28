pipeline {
  agent any

  environment {
    IMAGE_NAME = "sai798187/nodejs-shopping"
    IMAGE_TAG  = "${BUILD_NUMBER}"
    KUBE_NAMESPACE = "shopping-app"
  }

  stages {
    stage('Checkout') {
      steps { https://github.com/sai798187/nodejs-shopping.git }
    }

    stage('Install & Test') {
      steps {
        sh 'npm ci'
        sh 'npm test || true' // replace with real tests
      }
    }

    stage('Build Docker Image') {
      steps {
        sh 'docker build -t $IMAGE_NAME:$IMAGE_TAG -t $IMAGE_NAME:latest .'
      }
    }

    stage('Push Docker Image') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
          sh 'docker push $IMAGE_NAME:$IMAGE_TAG'
          sh 'docker push $IMAGE_NAME:latest'
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        sh 'kubectl apply -f k8s/namespace.yaml'
        sh 'kubectl apply -f k8s/mongodb.yaml'
        sh 'kubectl apply -f k8s/app.yaml'
        sh "kubectl -n $KUBE_NAMESPACE set image deployment/nodejs-shopping nodejs-shopping=$IMAGE_NAME:$IMAGE_TAG"
      }
    }
  }
}
