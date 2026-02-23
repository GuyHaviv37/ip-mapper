interface AddInputButtonProps {
  onAddInput: () => void
}

export default function AddInputButton({ onAddInput }: AddInputButtonProps) {
  return (
    <button className="mt-4 px-4 py-2 rounded-md bg-blue-500 text-white" onClick={onAddInput}>
      Add Input
    </button>
  )
}