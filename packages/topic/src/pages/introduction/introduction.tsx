import React from 'react'
import config from 'src/configs'
import {EnumPlatformEnv} from 'src/types/type'
import './index.scss'
import style from './index.module.scss'

const Introduction = () => {
  const gotoAdmin = () => {
    const adminUrl = config.env === EnumPlatformEnv.dev ? 'https://cweb-test.yy.com/admin' : '/admin'
    document.cookie = `cwebfrom=${window.location.origin}; domain=yy.com; max-age=500; path=/`
    window.location.replace(adminUrl)
  }
  return (
    <div className={style.container}>
      <div>
        <div className={style.animationbox} onClick={gotoAdmin}>
          管理后台
        </div>
      </div>
    </div>
  )
}

export default Introduction
