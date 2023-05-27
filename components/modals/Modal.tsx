import { useCallback, useEffect, useState } from "react";
import icon from '../../public/assets/shared/icon-arrow-left.svg'
import Button from "../Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import feeIcon from '../../public/assets/shared/icon-new-feedback.svg'

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onDelete?: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
  goBack?:boolean;
  reduce?:boolean;
  back?:boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onDelete,
  title,
  body,
  actionLabel,
  footer,
  disabled,
  secondaryAction,
  secondaryActionLabel,
  goBack,
  reduce,
  back
}) => {
  const [showModal, setShowModal] = useState(isOpen);
  const router = useRouter()
  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);
//Handle  close
  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    if(goBack || back){
      router.push('/')
      
    }
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, goBack, back, router, onClose]);
//Handle submit
  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);
//Handle delete
  const handleDelete = useCallback(() => {
    if (disabled) {
      return;
    }
    if(onDelete){
      return onDelete();
    };

  }, [disabled, onDelete]);
//Handle secondaryAction
  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [secondaryAction, disabled]);
// if not open
  if (!isOpen) {
    return null;
  }

  return (
    <div className=" flex flex-col flex-start z-50">
      
      <div
        className="
          justify-center 
          items-center 
          flex 
          overflow-x-hidden 
          overflow-y-auto 
          fixed 
          inset-0 
          z-50
          outline-none 
          focus:outline-none
          bg-white
        "
      >
        
        <div
          className="
          relative 
          w-full
          md:w-4/6
          lg:w-3/6
          xl:w-2/5
          my-6
          mx-auto 
          h-full 
          lg:h-auto
          md:h-auto
          "
        >
         { back && (
         <div className=" flex flex-row gap-2 cursor-pointer py-10 px-4" onClick={handleClose}>
            <Image src={icon} alt='arrow-left' />
            <p className=" bg-white text-ocean_night text-xs">Go back</p>
          </div>)}
          {/*content*/}
          <div
            className={`
            translate
            duration-300
            h-full
            ${showModal ? "translate-y-0" : "translate-y-full"}
            ${showModal ? "opacity-100" : "opacity-0"}
          `}
          >
            <div
              className="
              translate
              lg:h-auto
              md:h-auto
              border-0 
              rounded-lg 
              shadow-lg 
              relative 
              flex 
              flex-col 
              w-full 
              bg-white 
              outline-none 
              focus:outline-none
            "
            >
              {/*header*/}
              <div
                className="
                flex 
                items-center 
                p-6
                rounded-t
                justify-center
                relative
                border-b-[1px]
                "
              >
                {goBack && (
                <div>
                  <Image src={feeIcon}  alt='feedIcon' className=" absolute -top-4 left-4" />
                </div>
                )}
                <div className="text-lg font-semibold">{title}</div>
              </div>
              {/*body*/}
              <div className="relative px-6 py-1 flex-auto">{body}</div>
              {/*footer*/}
              <div className="flex flex-col gap-2 p-6">
                <div
                  className="
                    flex 
                    flex-row 
                    items-center 
                    gap-4
                    w-full
                    md:justify-end
                  "
                >
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      disabled={disabled}
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                      outline
                      venetian
                    />
                  )}

                 { !goBack ? (<Button
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                    venetian

                  />):
                  (!reduce ? ( 
                    <>
                    <div className="flex flex-col w-full md:hidden  gap-2 ">
                    <Button
                      disabled={disabled}
                      label={actionLabel}
                      onClick={handleSubmit}
                      venetian
                      font13
                      
                    />
                      
                      <Button
                      disabled={disabled}
                      label="cancel"
                      onClick={handleClose}
                      reduce
                      font13
                      
                    />  
                  </div>

                  <div className="hidden md:flex md:flex-row w-[60%] gap-2">
                    <Button
                    disabled={disabled}
                    label="cancel"
                    onClick={handleClose}
                    reduce
                    width
                    font14
                    
                    />
                    <Button
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                    venetian
                    font14
                    
                  />
                </div>
                </>
                 
                  ):(
                    <>
                    <div className="flex flex-col w-full md:hidden  gap-2 ">
                    <Button
                      disabled={disabled}
                      label={actionLabel}
                      onClick={handleSubmit}
                      venetian
                      font13
                    />
                      
                      <Button
                      disabled={disabled}
                      label="Cancel"
                      onClick={handleClose}
                      reduce
                      font13
                    />  

                    <Button
                      disabled={disabled}
                      label="Delete"
                      onClick={handleDelete}
                      jasper
                      font13
                    />  
                  </div>

                  <div className="hidden md:grid md:grid-cols-[1fr,4fr] justify-between w-full gap-20">

                    <div className="grid grid-cols-1"> 
                      <Button
                      disabled={disabled}
                      label="Delete"
                      onClick={handleDelete}
                      jasper
                      font14
                      />
                    </div>

                    <div className="grid grid-cols-[1fr,2fr] gap-2">
                      <Button
                      disabled={disabled}
                      label="Cancel"
                      onClick={handleClose}
                      reduce
                      font14
                      />
                      <Button
                      disabled={disabled}
                      label={actionLabel}
                      onClick={handleSubmit}
                      venetian
                      font14
                      />
                  </div>

                </div>
                </>

                  ))
                  
                  }
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
