export enum EventType {
  Link = 'Link',
  GameLink = 'GameLink',
  GameActBarLink = 'GameActBarLink',
  Code = 'Code',
  GameRoom = 'Room',
}
const cacheEvent: Record<string, any> = {}
const eventFunction = (ev: any) => {
  try {
    const YYApiCore = require('src/helpers/app/YYApiCore.js').default || {}
    ;(ev as React.MouseEvent).stopPropagation()
    ;(ev as React.MouseEvent).preventDefault()
    const empEvent = cacheEvent[ev.currentTarget.id]
    if (!empEvent) {
      return
    }
    const type = empEvent.eventType
    const value = empEvent[empEvent.eventType]
    switch (type) {
      case EventType.GameLink: {
        let url = window.location.href.replace('device=other', 'device=mobile')
        if (value) {
          url = value
        }
        YYApiCore?.invokeClientMethod?.('ui', 'goto', {
          uri: `bdgamelive://BDGWeb/Features/7/Url/${encodeURIComponent(url)}`,
        })
        break
      }
      case EventType.GameActBarLink: {
        let url = window.location.href.replace('device=other', 'device=mobile')
        if (value) {
          url = value
        }
        YYApiCore?.invokeClientMethod?.('game', 'openHalfWindow', {
          actUrl: url,
          portrait: '557',
          landscape: '375',
          backGroudColor: '#000000',
          alpha: '0.2',
          ratio: 375 / 557 + '',
        })
        break
      }
      case EventType.Link: {
        window.location.href = value
        break
      }
      case EventType.Code: {
        const context = {
          YYApiCore,
        }
        const fun = new Function(`with(this){var temp = function() {${value}};  temp()}`).bind(context)
        fun()
        break
      }
      case EventType.GameRoom: {
        const roomList = value.split(/,|;|\n/).filter((item: string) => item)
        const sid = roomList[Math.floor(Math.random() * roomList.length)]
        YYApiCore.invokeClientMethod('game', 'joinChannel', {
          sid,
        })
      }
    }
  } catch (e) {
    console.error('执行runcode事件异常')
  }
}

export const runCode = (dom: HTMLElement, empEvent: any) => {
  cacheEvent[dom.id] = empEvent
  if (empEvent.eventType) {
    dom.removeEventListener('click', eventFunction, true)
    dom.addEventListener('click', eventFunction, true)
  }
}
