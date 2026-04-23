pipeline {
    agent any

    stages {
        stage('Install') {
            steps {
                echo 'Installing dependencies...'
                bat 'npm ci'
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests...'
                bat 'npm test -- --coverage=false'
            }
        }

        stage('SAST') {
            steps {
                echo 'Running SAST - npm audit...'
                catchError(buildResult: 'SUCCESS', stageResult: 'UNSTABLE') {
                    bat 'npm audit --json > npm-audit-report.json'
                }
            }
        }


        stage('Build') {
            steps {
                echo 'Building application...'
                bat 'npm run build'
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Building Docker image...'
                catchError(buildResult: 'SUCCESS', stageResult: 'UNSTABLE') {
                    bat 'docker build -t revoshop:latest .'
                }
            }
        }
    }
}
