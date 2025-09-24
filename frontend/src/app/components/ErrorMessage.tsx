type Props = { message: string };
export default function ErrorMessage({ message }: Props) {
  return (
    <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-center">
      {message}
    </div>
  );
}
