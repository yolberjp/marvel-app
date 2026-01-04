import ErrorPage from '../components/error-page'

export default async function Error({
  searchParams,
}: {
  searchParams: Promise<{ status: string; message: string }>
}) {
  const { status, message } = await searchParams

  console.warn(message)

  return (
    <ErrorPage
      status={status}
      title="Something went wrong!"
      message="Sorry, an error occurred while loading this page. Please try again later."
    />
  )
}
