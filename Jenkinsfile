pipeline {
    agent { label 'firstnode' }
    stages {
        stage("Copy Code") {
            steps {
                dir('/home/projects/next-projects/ubreality-client-dev') {
                    sh "pm2 stop ubreality-client-dev"
                    script {
                        def srcExists = sh(script: 'test -d /home/projects/next-projects/ubreality-client-dev/src', returnStatus: true)
                        if (srcExists == 0) {
                            sh 'echo "Source directory exists. Proceeding to remove contents."'
                            sh 'sudo rm -r /home/projects/next-projects/ubreality-client-dev/src/*'
                        } else {
                            sh 'echo "Source directory does not exist. Skipping removal."'
                        }
                    }
                    // sh "sudo rm -r /home/projects/next-projects/ubreality-client-dev/.next"
                    sh "sudo cp -r /${WORKSPACE}/** ./"
                }
            }
        }
        stage("Pm2 Process") {
            steps {
                dir('/home/projects/next-projects/ubreality-client-dev') {
                    sh "sudo pm2 stop ubreality-client-dev"
                    sh "sudo npm install --force"
                    // sh "sudo npm audit fix --force"
                    // sh "pm2 flush ubreality-client-dev"
                    sh "sudo npm run build"
                    sh "pm2 start ubreality-client-dev"
                }
            }
        }
    }
}
