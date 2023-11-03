const Heading = ({ short, title, description }: { short: string; title: string; description: string }) => {
  return (
    <div className="mb-14 text-center max-w-2xl mx-auto">
      <p className="p-2 text-sm tracking-wider uppercase">{short}</p>
      <h2 className="mb-8 text-secondary font-rajdhani font-bold leading-none text-3xl sm:text-5xl">
        {title}
      </h2>
      <p className="text-lg text-neutral">{description}</p>
    </div>
  )
}

export default Heading
