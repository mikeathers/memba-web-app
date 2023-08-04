interface CheckIfUserCanLoginProps {
  emailAddress: string
  userCollection: MembaUser[] | []
}
export const checkIfUserCanLogIn = (props: CheckIfUserCanLoginProps) => {
  const {emailAddress, userCollection} = props
  const user = userCollection.find((user) => user.emailAddress === emailAddress)
  if (user) {
    return Promise.resolve(true)
  }

  return Promise.reject('Incorrect username or password')
}
