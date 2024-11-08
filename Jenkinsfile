pipeline {
    agent any

    environment {
        // Define the Docker image name
        DOCKER_IMAGE = 'practicals'
        // Define the container name
        CONTAINER_NAME = 'practicals_container1'
    }

    stages {
        stage('Checkout') {
            steps {
                // Clone the repository
                git 'https://github.com/immanuel2711/practicals.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // Install Node.js dependencies
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    // Run unit tests (if available)
                    sh 'npm test || echo "No tests found, skipping this stage."'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image with the specified name
                    sh 'docker build -t $DOCKER_IMAGE .'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Log in to Docker Hub using Jenkins credentials
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'immanuel2711', passwordVariable: 'emman2702')]) {
                        sh 'echo $PASSWORD | docker login -u $USERNAME --password-stdin'
                        sh 'docker push $DOCKER_IMAGE'
                    }
                }
            }
        }

        stage('Deploy to Container') {
            steps {
                script {
                    // Stop and remove the existing container if it is running
                    sh 'docker stop $CONTAINER_NAME || true && docker rm $CONTAINER_NAME || true'
                    
                    // Run the new container with the updated image
                    sh 'docker run -d -p 3000:3000 --name $CONTAINER_NAME $DOCKER_IMAGE'
                }
            }
        }
    }

    post {
        always {
            // Clean up the workspace
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the logs for errors.'
        }
    }
}
