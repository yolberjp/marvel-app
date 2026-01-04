import ErrorPage from "./components/error-page";

export default function NotFound() {
  return (
    <ErrorPage
      status="404"
      title="Page Not Found"
      message="Check that you typed the address correctly, go back to your previous page or try using our site search to find something specific."
    />
  );
}
