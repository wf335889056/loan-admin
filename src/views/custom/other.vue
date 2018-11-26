<template>
  <div class="wrapper">
     <Row class="row">
       <Form ref="formInline" class="formInline" :model="formInline"  inline>
        <Col span="22">
            <FormItem>
              <Input type="text" v-model="formInline.name" clearable placeholder="电话号码" />
            </FormItem>
            <FormItem>
              <Input type="text" v-model="formInline.name" clearable placeholder="客户来源" />
            </FormItem>
        </Col>
        <Col span="2">
          <FormItem>
            <Button type="success" size="default" @click="handleSubmit">搜索</Button>
          </FormItem>
        </Col>
        </Form>
    </Row>
    <div class="table">
      <Table :loading="loading" :columns="columns" :data="list"></Table>
      <Page :current="page" :page-size="20" :total="list.length" show-total class="page" @on-change="handleChange" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {},
      list: [{name: 12313}],
      loading: true,
      page: 1,
      columns: [
        { title: '电话号码', key: 'name', align: 'center' },
        { title: '客户来源', key: 'name', align: 'center' },
        { title: '备注', key: 'name', align: 'center' },
        {
          title: '操作',
          key: 'action',
          width: 100,
          align: 'center',
          render: (h, params) => {
            return h('Button', {
              props: {
                type: 'text',
                size: 'small'
              },
              style: {
                color: '#2db7f5'
              },
              on: {
                click: (e) => {
                  e.stopPropagation()
                  this.handleUpdate()
                }
              }
            }, '备注')
          }
        }
      ],
      value: ''
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 1000)
  },
  methods: {
    handleSubmit() {
    },
    handleChange(val) {
      console.log(val)
    },
    handleUpdate() {
      this.$Modal.confirm({
        render: (h) => {
          return h('Input', {
            props: {
              value: this.value,
              autofocus: true,
              placeholder: '修改备注',
              size: 'default'
            },
            on: {
              input: (val) => {
                this.value = val
              }
            }
          })
        },
        onOk: () => {
          console.log(this.value)
          this.value = ''
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>