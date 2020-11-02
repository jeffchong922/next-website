export interface DescBlockProps {
  title: string
  className: string
}

const DescBlock: React.FC<DescBlockProps> = ({
  title,
  children,
  className
}) => {
  return (
    <div className={className ? className : ''}>
      <h3 className='text-sm uppercase font-bold text-gray-600'>{title}</h3>
      <div>
        {children}
      </div>
    </div>
  )
}

export default DescBlock