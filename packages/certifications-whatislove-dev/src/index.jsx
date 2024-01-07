import { StrictMode } from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import '~/assets/styles/styles.css'
import { App } from '~/components/app/app.jsx'

render(
	<StrictMode>
		<Router>
			<App />
		</Router>
	</StrictMode>,
	document.querySelector(`#root`),
)
