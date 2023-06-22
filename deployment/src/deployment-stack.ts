import {Construct} from 'constructs'
import {Stack, StackProps} from 'aws-cdk-lib'
import CONFIG from './config'
import {
  createARecordForDistribution,
  createBucket,
  createBucketDeploymentWithDistribution,
  createCertificate,
  createDistribution,
  getHostedZone,
  getRewriteFunction,
  getSecurityHeader,
  handleAccessIdentity,
} from './aws'

interface DeploymentStackProps extends StackProps {
  stage: string
}

export class DeploymentStack extends Stack {
  constructor(scope: Construct, id: string, props: DeploymentStackProps) {
    super(scope, id, props)
    const {stage} = props
    const isProduction = stage === 'prod'
    const url = isProduction ? CONFIG.PROD_URL : CONFIG.DEV_URL

    const hostedZone = getHostedZone({scope: this, domainName: url})

    const responseHeadersPolicy = getSecurityHeader(this)

    const bucket = createBucket({
      bucketName: `${CONFIG.STACK_PREFIX}WebsiteBucket`,
      scope: this,
    })

    const accessIdentity = handleAccessIdentity({
      scope: this,
      bucket,
      name: `${CONFIG.STACK_PREFIX}CloudFrontOriginAccessIdentity`,
    })

    const certificate = createCertificate({
      scope: this,
      url,
      hostedZone,
      name: `${CONFIG.STACK_PREFIX}WebsiteCertificate`,
    })

    const rewriteFunction = getRewriteFunction({
      scope: this,
    })

    const distribution = createDistribution({
      scope: this,
      bucket,
      url,
      certificate,
      accessIdentity,
      securityHeadersPolicy: responseHeadersPolicy,
      functionAssociation: rewriteFunction,
      stage,
      distributionName: `${CONFIG.STACK_PREFIX}CloudfrontDistribution`,
    })

    createBucketDeploymentWithDistribution({
      scope: this,
      bucket,
      filePath: './out',
      deploymentName: `${CONFIG.STACK_PREFIX}BucketDeployment`,
      distribution,
    })

    createARecordForDistribution({
      scope: this,
      hostedZone,
      url,
      distribution,
      name: `${CONFIG.STACK_PREFIX}WebsiteARecord`,
    })
  }
}
