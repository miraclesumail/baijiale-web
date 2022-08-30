import React, {
  useState,
  forwardRef,
  ForwardedRef,
  ChangeEvent,
  useMemo
} from 'react'
import classnames from 'classnames'
import styles from './style.module.scss'

type Props = {
  placeholder: string;
  inputCls?: string;
  errorMsg?: string;
  defaultValue?: string;
  value?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Index = forwardRef(
  (
    { placeholder, value, onChange, errorMsg, inputCls }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [{ isFocus, hasReacted }, setState] = useState<any>({
      isFocus: false,
      hasReacted: false
    })

    const onFocus = () => {
      console.log('onFocusonFocusonFocus')
      setState({ isFocus: true })
    }

    const onBlur = () => {
      console.log('onBluronBluronBlur')
      setState({ isFocus: false, hasReacted: true })
    }

    const active = useMemo(() => isFocus || value, [isFocus, value])

    const inValid = useMemo(
      () => !isFocus && !value && hasReacted,
      [isFocus, value]
    )

    return (
      <div className={styles.inputContainer}>
        <input
          className={classnames({
            [styles.input]: true,
            [styles.active]: active,
            [styles.inValid]: inValid
          }, inputCls)}
          id="firstname_111"
          placeholder=""
          autoComplete='off'
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        ></input>
        <label
          htmlFor="firstname_111"
          className={classnames({
            [styles.placeholder]: true,
            [styles.active]: active
          })}
        >
          {placeholder}
        </label>
        {inValid && <img src={require('@/assets/images/bet/inputError.png')} />}
        {value && hasReacted && !isFocus && (
          <img src={require('@/assets/images/bet/inputSuccess.png')} />
        )}

        {inValid && errorMsg && <div className={styles.errorMsg}>{errorMsg}</div>}
      </div>
    )
  }
)

Index.displayName = 'Input'

export default Index
