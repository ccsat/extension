import React, { useState } from "react"
import PropTypes from "prop-types"
import SharedSlideUpMenu from "../Shared/SharedSlideUpMenu"
import TopMenu from "../TopMenu/TopMenu"
import TopMenuProtocolList from "../TopMenu/TopMenuProtocolList"
import AccountsNotificationPanel from "../AccountsNotificationPanel/AccountsNotificationPanel"
import TabBar from "../TabBar/TabBar"
import HiddenDevPanel from "../HiddenDevPanel/HiddenDevPanel"

export default function CorePage(props) {
  const { children, hasTabBar, hasTopBar } = props

  const [isProtocolListOpen, setIsProtocolListOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false)

  function handleOpenHiddenDevMenu(e) {
    if (process.env.NODE_ENV === "development" && e.detail === 3) {
      setIsDevToolsOpen(true)
    }
  }

  return (
    <main>
      <SharedSlideUpMenu
        isOpen={isProtocolListOpen}
        close={() => {
          setIsProtocolListOpen(false)
        }}
      >
        <TopMenuProtocolList />
      </SharedSlideUpMenu>
      <SharedSlideUpMenu
        isOpen={isNotificationsOpen}
        close={() => {
          setIsNotificationsOpen(false)
        }}
      >
        <AccountsNotificationPanel />
      </SharedSlideUpMenu>
      <SharedSlideUpMenu
        isOpen={isDevToolsOpen}
        size="small"
        close={() => {
          setIsDevToolsOpen(false)
        }}
      >
        <HiddenDevPanel />
      </SharedSlideUpMenu>
      <div className="page">
        {hasTopBar ? (
          <button
            type="button"
            className="top_menu_wrap"
            onClick={handleOpenHiddenDevMenu}
          >
            <TopMenu
              toggleOpenProtocolList={() => {
                setIsProtocolListOpen(!isProtocolListOpen)
              }}
              toggleOpenNotifications={() => {
                setIsNotificationsOpen(!isNotificationsOpen)
              }}
            />
          </button>
        ) : null}
        <div className="page_content">{children}</div>
        {hasTabBar ? <TabBar /> : null}
      </div>
      <style jsx>
        {`
          .page {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            height: 100vh;
            width: 100vw;
          }
          .page_content {
            height: 480px;
            width: 100%;
            overflow-y: scroll;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            margin: 0 auto;
            align-items: center;
          }
          .top_menu_wrap {
            z-index: 10;
            cursor: default;
          }
        `}
      </style>
    </main>
  )
}

CorePage.propTypes = {
  children: PropTypes.node.isRequired,
  hasTabBar: PropTypes.bool,
  hasTopBar: PropTypes.bool,
}

CorePage.defaultProps = {
  hasTabBar: true,
  hasTopBar: true,
}
