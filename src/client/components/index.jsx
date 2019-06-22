import { Component } from 'react-subx'
import { Spin } from 'antd'
import AddFaq from './add-faq'
import Faqs from './faqs'

export default class App extends Component {
  componentDidMount () {
    this.init()
  }

  init = async () => {
    await this.props.store.getUser()
    await this.props.store.list()
  }

  render () {
    let { store } = this.props
    return (
      <Spin spinning={store.fetchingUser}>
        <div className='wrap'>
          <h1>FAQ skill setting</h1>
          <p>Any one send you message that includes <b>keywords</b>, bot will send corresponding <b>answer</b>.</p>
          <p>Any one send you message <b className='color-red'>faq-help</b>, bot will send keywords list.</p>
          <p>keywords wrapped with <b className='color-red'>"</b>, like <b className='color-red'>"some keywords"</b> will match the whole message.</p>
          <AddFaq store={store} />
          <Faqs store={store} />
        </div>
      </Spin>
    )
  }
}
