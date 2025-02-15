import Home from './pages/Home'
import Info from './pages/Info'
import Error from './pages/Error'
import Cabinet from './pages/Cabinet'
import Important from './pages/Important'
import { Routes, Route } from 'react-router-dom'

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="info" element={<Info />} />
            <Route path="*" element={<Error />} />
            <Route path="cabinet" element={<Cabinet/>}/>
            <Route path="important" element={<Important/>}/>
            
            {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
    )
}
