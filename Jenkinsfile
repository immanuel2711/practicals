pipeline {
    agent any
    environment {
        DOCKER_CREDENTIALS = credentials('dockerhub-creds') // Jenkins credential ID for Docker Hub credentials
    }
    stages {
        stage('Checkout SCM') {
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
                    sh 'docker build -t immanuel2711/practicals .'
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    // Perform Docker login with credentials stored in Jenkins
                    sh '''
                    docker login -u ${DOCKER_CREDENTIALS_USR} -p ${DOCKER_CREDENTIALS_PSW}
                    '''
                    sh 'docker push immanuel2711/practicals:latest'
                }
            }
        }
        stage('Deploy to Container') {
            steps {
                script {
                    echo 'Deploying to container...'
                    // Add deployment steps here (if needed)
                }
            }
        }
    }
    post {
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline failed, please check the logs for details.'
        }
    }
}
