pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'practicals'
        DOCKER_REGISTRY = 'docker.io'  // Replace with your registry if different
    }

    stages {
        stage('Declarative: Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    sh 'npm test'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t ${DOCKER_IMAGE} .'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Use credentials from Jenkins to log in to Docker registry
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', 
                                                      usernameVariable: 'DOCKER_USER', 
                                                      passwordVariable: 'DOCKER_PASSWORD')]) {
                        // Perform Docker login using the credentials
                        sh 'echo $DOCKER_PASSWORD | docker login $DOCKER_REGISTRY -u $DOCKER_USER --password-stdin'
                        // Push the Docker image
                        sh 'docker push ${DOCKER_IMAGE}:latest'
                    }
                }
            }
        }

        stage('Deploy to Container') {
            steps {
                script {
                    // Add deployment logic here (if required)
                    echo 'Deploy to container stage skipped'
                }
            }
        }

        stage('Declarative: Post Actions') {
            steps {
                cleanWs()
            }
        }
    }

    post {
        failure {
            echo 'Pipeline failed. Check the logs for errors.'
        }
    }
}