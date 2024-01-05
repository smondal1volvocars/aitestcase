import * as React from 'react'

interface ButtonProps {
    text: string
    checked?: boolean
    disabled?: boolean
    buttonType?: 'primary' | 'default'
    className?: string
    onClick?: any
    icon?: any
    style?: any
    ariaDescribedBy?: any
}

const ButtonComponent: React.FunctionComponent<ButtonProps> = (props) => {
    const {
        text,
        disabled = false,
        className,
        onClick,
        style,
        ariaDescribedBy
    } = props

    return (
        <>
                <button
                    value={text}
                    disabled={disabled}
                    className={className}
                    onClick={onClick}
                    style={style}
                    aria-describedby={ariaDescribedBy}
                />
            
        </>
    )
}

export default ButtonComponent
