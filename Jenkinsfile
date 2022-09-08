pipeline {

  agent any

  options {

      buildDiscarder(
          logRotator(
              // number of build logs to keep
              numToKeepStr:'2',
              // history to keep in days
              daysToKeepStr: '1',
              // artifacts are kept for days
              artifactDaysToKeepStr: '1',
              // number of builds have their artifacts kept
              artifactNumToKeepStr: '2'
          )
      )
  }

  environment{
        DOCKERHUB_CREDENTIALS=credentials('dockerhub-cred')
  }

  stages {

    stage('Checkout code'){
	
        steps {
		    echo  'Pulling..master'
                
                git credentialsId: 'f2801aed-98de-4457-ac54-6eaac306ab2f', url: 'https://tools.publicis.sapient.com/bitbucket/scm/pmap/fake-payment-gateway.git', branch : "master"

		    }
	    }

    stage ('Build Image') {

                    steps {

                            sh 'docker build -t laxminarayanak/fake-payment-gateway:latest .'
                            sh 'docker build -t laxminarayanak/fake-payment-gateway:' + env.GIT_COMMIT+ ' .'

                        }
                        

                    }

    stage ('Login to DockerHub') {

                    steps {
                        sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                    }

                }

    stage ('Push Image to DockerHub') {

                            steps {

                                        sh 'docker push laxminarayanak/fake-payment-gateway:' + env.GIT_COMMIT
                                        sh 'docker push laxminarayanak/fake-payment-gateway:latest'

                            }
                }
        
    stage("Send Instance Refresh to Auto Scaling Group") {

                                steps {

                                        script {
                                            
                                            def ASG_NAME = "ps-ta-payment-gateway-autoscale"
                                            def AWS_REGION = "us-east-1"
                                            def IAM_CREDENTIALS_NAME = "aws-dev-asg-credentials"

                                                  echo "ASG_NAME ${ASG_NAME}"
                                                  echo "AWS_REGION ${AWS_REGION}"
                                                  echo "IAM_CREDENTIALS_NAME ${IAM_CREDENTIALS_NAME}"

                                                 withCredentials([usernamePassword(credentialsId: IAM_CREDENTIALS_NAME, passwordVariable: 'AWS_KEY_SECRET', usernameVariable: 'AWS_KEY_ID')]) {

                                                      echo "Authentication succeeded"

                                                    // set the aws credentials
                                                    sh 'aws configure set aws_access_key_id ' + AWS_KEY_ID
                                                    sh 'aws configure set aws_secret_access_key ' + AWS_KEY_SECRET
                                                    sh 'aws configure set region ' + AWS_REGION

                                                    // use the AWS CLI to send the request to rotate the servers,
                                                    // which will cause them to pull the latest Docker image.
                                                    // https://docs.aws.amazon.com/cli/latest/reference/autoscaling/start-instance-refresh.html
                                                    sh 'aws autoscaling start-instance-refresh --auto-scaling-group-name ' + ASG_NAME

                                            }

                                        }
                                    }
                                }

   
    }

  
     post {
              always {
                  sh 'docker logout'
              }
          }
} 