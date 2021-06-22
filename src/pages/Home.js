import React from 'react'
import { Grid ,Row,Col} from 'rsuite'
import Sidebar from '../components/Sidebar'

const Home = () => {
  return (
    <Grid fluid className="h-100">
      <Row>
        <Col>
        <Sidebar/>
        </Col>
      </Row>
      <h2> Home</h2>
    </Grid>
  )
}

export default Home
