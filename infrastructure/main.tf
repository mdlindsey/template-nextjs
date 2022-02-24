terraform {
  required_version = ">= 0.13"
}

provider "aws" {
  region = var.aws_region
}

resource "aws_ecr_repository" "ecr-image-repo" {
  name = var.aws_ecr_repo
}

resource "aws_apprunner_service" "app-runner-service" {
  service_name = var.aws_app_runner_service

  source_configuration {
    authentication_configuration {
      access_role_arn = "arn:aws:iam::${var.aws_iam_id}:role/service-role/AppRunnerECRAccessRole"
    }
    # Auto deploy when new image is pushed to ECR
    auto_deployments_enabled = true

    image_repository {
      image_configuration {
        port = "3000"
      }
      image_identifier      = "${var.aws_iam_id}.dkr.ecr.${var.aws_region}.amazonaws.com/${var.aws_ecr_repo}:latest"
      image_repository_type = "ECR"
    }
  }
}



