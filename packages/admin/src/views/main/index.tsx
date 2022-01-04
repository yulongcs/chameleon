import React, {useEffect} from 'react'
import {observer} from 'mobx-react'
import {Outlet} from 'src/routers/router'
import routerConfig from 'src/routers/config'
import {Menu} from 'antd'
import {useHistory, Link} from 'react-router-dom'
import HeaderBar from 'src/components/header_bar'
import {SelectEventHandler} from 'rc-menu/lib/interface'
import useBool from 'src/hooks/useBool'
import 'src/css/common.scss'
import css from './index.module.scss'
const {SubMenu} = Menu

const PageMain: React.FC = () => {
  const history = useHistory()
  const [init, initHandle] = useBool(false)
  const onSelect: SelectEventHandler = ({key}) => {
    history.push(key)
  }
  // 默认全部菜单展开
  const defaultOpenKeys = routerConfig.map(submenu => submenu.path)
  // 默认选中项
  const defaultSelectedKeys = [history.location.pathname]
  useEffect(() => {
    initHandle.show()
  }, [])
  return (
    <div className={css.page}>
      <div className={css.aside}>
        <Link to={'/'} className={css.logo}>
          EMP低代码平台
        </Link>
        <Menu
          mode={'inline'}
          onSelect={onSelect}
          defaultOpenKeys={defaultOpenKeys}
          defaultSelectedKeys={defaultSelectedKeys}>
          {routerConfig
            .filter(submenu => !submenu.menuHide)
            .map(submenu => (
              <SubMenu key={submenu.path} title={submenu.title} icon={<submenu.icon />}>
                {submenu.routes
                  ?.filter(menuitem => !menuitem.menuHide)
                  .map(menuitem => (
                    <Menu.Item key={menuitem.path}>{menuitem.title}</Menu.Item>
                  ))}
              </SubMenu>
            ))}
        </Menu>
      </div>
      <div className={css.main}>
        <HeaderBar />
        <div className={css.container}>{init && <Outlet />}</div>
      </div>
    </div>
  )
}

export default observer(PageMain)
