/**
 * Created by freeman on 17-1-22.
 */

import IconForm from './images/icon_nav_form.png';
import IconFeedback from './images/icon_nav_feedback.png';
import IconLayout from './images/icon_nav_layout.png';
export const menus = [
  {
    name: 'Form',
    icon: IconForm,
    items: [
      {
        label: 'Button',
        to: '/button'
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
    ]
  },{
    name: 'Feedbacks',
    icon: IconFeedback,
    items: [
      {
        label: 'Toast',
        to: '/toaster'
      },
    ]
  },
]
