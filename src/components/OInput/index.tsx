import React, {FC, useMemo, useState} from 'react'
import styled from 'styled-components'
import closeEye from '@/assets/images/auth/closeEye.svg'
import openEye from '@/assets/images/auth/showEye.svg'
import {ValidateInput} from '@/utils'
import {Row} from '../flex'

const ContentView = styled(Row)`
  position: relative;
  width: 100%;

  .errView {
    width: 100%;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #F36060;
    position: absolute;
    text-align: left;
    left: 0;
    top: 70px;
    opacity: 0;
    z-index: 1;
  }
`

interface InputProps {
  borderColor: string | null;
  height?: number,
  width?: number
}

const InputView = styled(Row) <InputProps>`
  position: relative;
  width: ${({width}) => width ? width : '100%'};
  height: ${({height}) => height ? height : '64px'};
  padding: 20px 16px;
  z-index: 10;
  border-width: 1px;
  border-style: solid;
  /* 过渡boder颜色 */
  ${(props) => `border-color: ${props.borderColor}`};
  border-radius: 8px;
  transition: border-color 0.3s ease-in-out;
  background-color: rgba(10, 8, 8, .5);
  overflow: hidden;
`

interface IconProps {
  img?: string,
  isEye?: boolean,
}

const Icon = styled.img<IconProps>`
  width: 24px;
  height: 24px;
  margin: 0 auto;
  ${props => props.isEye && 'cursor: pointer'};
`

// 输入框的标题
interface LabelStyledProps {
  isFocus: boolean
}

const Label = styled.span<LabelStyledProps>`
  display: inline-block;
  position: absolute;
  left: 16px;
  top: 22px;
  color: #717171;
  height: 18px;
  line-height: 18px;
  font-size: 18px;
  transform: ${props => props.isFocus ? 'translate(-18px, -16px) scale(0.66)' : 'translate(0, 0px) scale(1)'};
  transition: transform 300ms ease-in-out;
  z-index: 9;
`

// 输入框
const Input = styled.input`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: #fff;
  padding: 0 1.5px;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  transform: translate(0, 4px);
  z-index: 10;

  &::placeholder {
    color: #d7d7d7;
    opacity: 0.5;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
  }
`

interface Props {
  type?: 'text' | 'password' | 'number',
  eye?: boolean,
  handleEye?: (eye: boolean) => void,
  value?: string,
  icon?: string,
  suffixIcon?: string,
  label?: string,
  placeholder?: string,
  setValue?: (value: string) => void,
  setErr?: (err: boolean) => void,
  err?: boolean,
  rules?: any[],
}

const OInput: FC<Props> = (
  {
    err,
    value,
    label,
    placeholder,
    setValue,
    type = 'text',
    setErr,
    eye,
    handleEye,
    icon,
    suffixIcon,
    rules
  }
) => {
  const [inputValue, setInputValue] = useState('')
  const [isEye, setIsEye ] = useState(eye)
  const [inputType, setInputType] = useState(type)
  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    setValue && setValue(value)
  }
  const [isFocus, setIsFocus] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  // 如果rules 为失焦时验证 则验证
  const blur = (v?: string) => {
    if (rules && rules.length) {
      const errMsg = ValidateInput.validate(rules, v || value)
      if (errMsg) {
        setErr(true)
        setErrMsg(errMsg)
      } else {
        setErr(false)
      }
    }
    setIsFocus(false)
  }
  const inputData = {
    onBlur: () => blur(),
    onFocus: () => {
      setIsFocus(true)
    },
    onChange: inputChange,
    value: value,
    placeholder: isFocus ? placeholder : ''
  }
  const borderColor = useMemo(() => {
    if (err) {
      return '#CB5460'
    }
    if (isFocus) {
      return '#D3AF6E'
    }
    return '#1D1D1D'
  }, [err, isFocus])

  const isLabelFocus = useMemo(() => {
    if (isFocus || (inputValue && inputValue.length > 0)) {
      return true
    } else {
      return false
    }
  }, [isFocus, inputValue])

  const toggleEye = () => {
    if (inputType === 'password') {
      setInputType('text')
    } else {
      setInputType('password')
    }
    setIsEye(!isEye)
    handleEye(!isEye)
  }

  return (
    <ContentView justify="space-between">
      <InputView borderColor={borderColor} justify="space-between">
        {
          icon && <Icon src={icon}/>
        }
        <Label isFocus={isLabelFocus}>{label}</Label>
        <Input type={inputType} {...inputData} />
        {type === 'password' &&
          <Icon onClick={toggleEye} isEye src={isEye ? openEye : closeEye}/>}
        {suffixIcon && <Icon src={suffixIcon}></Icon>}
      </InputView>
      <div className={`errView animate__animated ${err && 'animate__fadeInDown'}`}>
        {errMsg}
      </div>
    </ContentView>
  )
}

export default OInput
