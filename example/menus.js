/**
 * Created by freeman on 17-1-22.
 */

import IconForm from './images/icon_nav_form.png';
import IconFeedback from './images/icon_nav_feedback.png';
import IconLayout from './images/icon_nav_layout.png';
export const menus = [
  {
    name: 'Layout',
    icon: IconForm,
    items: [
      {
        label: 'Flex',
        to: '/flex'
      },
      {
        label: 'Grid',
        to: '/grid'
      },
    ]
  },
  {
    name: 'Navigation',
    icon: IconForm,
    items: [
      {
        label: 'NavBar',
        to: '/nav-bar'
      },
      {
        label: 'Popover',
        to: '/popover'
      },
      {
        label: 'Tabs',
        to: '/tabs'
      },
      {
        label: 'ListView',
        to: '/listview'
      },
    ]
  },
  {
    name: 'Form',
    icon: IconForm,
    items: [
      {
        label: 'Button',
        to: '/button'
      },{
        label: 'InputNumber',
        to: '/input-number'
      },{
        label: 'Picker',
        to: '/picker'
      },{
        label: 'DatePicker',
        to: '/date-picker'
      },
    ]
  },
  {
    name: 'Basic Components',
    icon: IconLayout,
    items: [
      {
        label: 'Viewer',
        to: '/viewer'
      },
      {
        label: 'Icons',
        to: '/icons'
      },
      {
        label: 'Progress',
        to: '/progress'
      },
      {
        label: 'Swipe',
        to: '/swipe'
      },
      {
        label: 'Loading',
        to: '/loading'
      },
      {
        label: 'Scroll',
        to: '/scroll'
      },
    ]
  },{
    name: 'Feedbacks',
    icon: IconFeedback,
    items: [
      {
        label: 'Toast',
        to: '/toaster'
      },
      {
        label: 'Modal',
        to: '/modal'
      },
    ]
  },
]
