import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Col, Spin, Image, Space, Typography } from 'antd'
import { useLocation, useParams } from 'react-router-dom'

const { Text, Title } = Typography

const ProductPage = () => {
  const { product } = useLocation()
  const [prod, setProd] = useState(product)
  const params = useParams()

  useEffect(() => {
    if (!product) {
      axios.get(`/products/${params.id}.json`)
        .then((res) => {
          console.log(res)
          setProd(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [params, product])

  if (prod) {
    console.log(prod)
    const hasDiscount = prod.discount > 0
    const price = (() => {
      const p = parseFloat(prod.price).toFixed(2)
      if (hasDiscount) {
        return (
          <Space direction="vertical" className="">
            <div>
              <Text type="danger" delete>{`$${p}`}</Text>
              <Text type="danger" strong>{` $${(p - p * prod.discount).toFixed(2)}`}</Text>
            </div>
            <Text type="danger">{`Save ${prod.discount * 100}%`}</Text>
          </Space>
        )
      }
      return <div className="product-card-price"><Text strong>{`$${p}`}</Text></div>
    })()

    const page = (
      <>
        <Row
          gutter={20}
          justify="center"
          style={{ width: '100%' }}
        >
          <Col>
            <Image src={prod.image} />
          </Col>
          <Col>
            <Title>{prod.name}</Title>
            <Text>{price}</Text>
          </Col>
        </Row>
      </>
    )
    return page
  }

  return <Row justify="center" align="middle"><Spin size="large" /></Row>
}

export default ProductPage