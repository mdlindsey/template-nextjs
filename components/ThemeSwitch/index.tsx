import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useDispatcher } from '~/hooks'
import { ColorScheme, GlobalState } from '~/store'
import { useEffect } from 'react'

const SwitchWrapper = styled.span`
  display: inline-block;
  position: relative;
  margin: auto;
  width: 42px;
  height: 22px;
  background: #8CB2F2;
  border-radius: 20px;
  cursor: pointer;
  ::after {
    content: '☀️';
    position: absolute;
    top: 0;
    left: 4px;
    font-size: 14px;
    height: 22px;
    line-height: 23px;
    text-align: center;
    transition: all .3s ease;
    @media screen and (max-width: 768px) {
      line-height: 22px;
      left: 1px;
    }
  }
  &.${ColorScheme.Dark} {
    background: #1A66E7;
    ::after {
      content: '🌛';
      transform: translateX(20px);
    }
    span {
      transform: translateX(0);
    }
  }
  span {
    position: absolute;
    z-index: 1;
    margin: 2px;
    display: block;
    width: 18px;
    height: 18px;
    background: white;
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(#000, .1);
    transform: translateX(20px);
    transition: all .4s ease;
  }
`

const ThemeSwitch = () => {
  const { switchColorScheme } = useDispatcher()
  const colorScheme = useSelector((s:GlobalState) => s.colorScheme)
  // If window object is available check if we have a color preference
  useEffect(() => {
    // Disregard if we already have colorScheme in state
    if (colorScheme) {
      return
    }
    try {
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme:dark)').matches
      if (prefersDarkMode && colorScheme !== ColorScheme.Dark) {
        switchColorScheme()
      }
    } catch(e) {}
  })
  return (
      <SwitchWrapper onClick={switchColorScheme} className={colorScheme}>
        <span></span>
      </SwitchWrapper>
  )
}

export default ThemeSwitch
