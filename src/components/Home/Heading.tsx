const Heading = ({ short, title, description }: { short: string; title: string; description: string }) => {
  return (
    <div className="mb-14 text-center max-w-2xl mx-auto">
      <p className="p-2 text-sm font-medium tracking-wider text-center uppercase">{short}</p>
      <h2 className="mb-12 text-4xl font-bold leading-none sm:text-5xl">{title}</h2>
      <p>{description}</p>
    </div>
  )
}

export default Heading
