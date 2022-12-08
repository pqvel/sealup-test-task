import React, { Component, ChangeEvent } from 'react'

interface Param {
  id: number
  name: string
  type: 'string'
}

interface ParamValue {
  paramId: number
  value: string
}

interface Model {
  paramValues: ParamValue[]
}

interface Product {
  params: Param[]
  model: Model
}

interface State {
  product: Product
}

interface Props {
  params: Param[]
  model: Model
  changeProduct: (product: Product) => void
}

interface ParamItemProps {
  name: string
  paramValues: ParamValue[]
  id: number
  onChangeParamValue: (e: ChangeEvent<HTMLInputElement>, id: number) => void
}

const data: Product = {
  params: [
    {
      id: 1,
      name: 'Назначение',
      type: 'string',
    },
    {
      id: 2,
      name: 'Длина',
      type: 'string',
    },
  ],
  model: {
    paramValues: [
      {
        paramId: 1,
        value: 'повседневное',
      },
      {
        paramId: 2,
        value: 'максимальное',
      },
    ],
  },
}

class App extends Component<{}, State> {
  state: State = {
    product: data,
  }

  public changeProduct = (newProduct: Product): void => {
    this.setState({
      product: newProduct,
    })
  }

  render() {
    const { params, model } = this.state.product

    return (
      <div className='App'>
        <ParamEditor
          changeProduct={this.changeProduct}
          params={params}
          model={model}
        />
      </div>
    )
  }
}

class ParamEditor extends Component<Props> {
  public getModel(): Model {
    return this.props.model
  }

  public onChangeParamValue = (
    e: ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const { params, model, changeProduct } = this.props

    changeProduct({
      params,
      model: {
        paramValues: model.paramValues.map((item) => {
          return item.paramId === id
            ? {
                paramId: item.paramId,
                value: e.target.value,
              }
            : item
        }),
      },
    })
  }

  render(): React.ReactNode {
    const { params } = this.props
    const { paramValues } = this.getModel()
    return (
      <table>
        <thead>
          <tr>
            <th>Параметры:</th>
            <th>Значения:</th>
          </tr>
        </thead>
        <tbody>
          {params.map(({ name, id, type }) => (
            <ParamItem
              paramValues={paramValues}
              name={name}
              id={id}
              key={id}
              onChangeParamValue={this.onChangeParamValue}
            />
          ))}
        </tbody>
      </table>
    )
  }
}

class ParamItem extends Component<ParamItemProps> {
  render(): React.ReactNode {
    const { name, paramValues, id, onChangeParamValue } = this.props
    return (
      <tr>
        <th>{name}</th>
        <th>
          {
            <input
              value={paramValues.find((param) => param.paramId === id)?.value}
              onChange={(e) => onChangeParamValue(e, id)}
            />
          }
        </th>
      </tr>
    )
  }
}

export default App
