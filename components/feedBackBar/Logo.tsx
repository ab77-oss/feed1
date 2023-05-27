import Image from "next/image"
import img from '../../public/assets/suggestions/icon-suggestions.svg'

const Logo = () => {
  return (
    <div className="hidden md:block">
       <Image src={img} alt='suggestions'/>
    </div>
  )
}

export default Logo