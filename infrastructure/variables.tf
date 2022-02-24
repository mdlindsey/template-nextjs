variable "aws_iam_id" {
  type = string
}

variable "aws_region" {
  type = string
  default = "us-east-1"
}

variable "aws_ecr_repo" {
  type = string
  default = "nextjs-client"
}

variable "aws_app_runner_service" {
  type = string
  default = "nextjs-client"
}
