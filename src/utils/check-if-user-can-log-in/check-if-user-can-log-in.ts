interface CheckIfUserCanLoginProps {
  emailAddress: string
  userCollection: MembaUser[] | []
}
export const checkIfUserCanLogIn = (props: CheckIfUserCanLoginProps) => {
  const {emailAddress, userCollection} = props
  console.log({props})
  const user = userCollection.find((user) => user.emailAddress === emailAddress)
  if (user) {
    return Promise.resolve(true)
  }

  console.log('here')
  return Promise.reject('Incorrect username or password')
}
