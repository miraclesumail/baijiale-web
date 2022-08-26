import { Column, Row } from '@/components/flex';
import React, { useMemo } from 'react'
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

interface Props {}
const TitleView = styled(Row)`
font-size:12rem;
`

const Header = styled.div`
  height: 85px;
  width: 1200px;
`
interface RoutePropsType {
  [key: string]: any
}
const Layout2 = (props: Props) => {
  const [routeProps, setRouteProps] = React.useState<RoutePropsType>({})
  const title = useMemo(() => {
    if (routeProps?.title) return decodeURIComponent(routeProps.title)
    return ''
  }, [routeProps.title])
  return (
    <Column>
      <TitleView className="title">{title}</TitleView>
      {/* <Header/> */}
      <Outlet context={[routeProps, setRouteProps]} />
    </Column>
  )
}

export default Layout2