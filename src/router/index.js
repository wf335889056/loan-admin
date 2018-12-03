import Vue from 'vue'
import Router from 'vue-router'
import AppRegister from '@/views/app/register'
import AppDownload from '@/views/app/download'
import AppBlank from '@/views/app/blankPage'
import Common from '@/views/common'
import Login from '@/views/login'
import Dashboard from '@/views/dashboard'
import CustomIndex from '@/views/custom/index'
import CustomOther from '@/views/custom/other'
import ApplyIndex from '@/views/apply/index'
import AuditIndex from '@/views/audit/index'
import AuditOther from '@/views/audit/other'
import CollectionIndex from '@/views/collection/index'
import LoanList from '@/views/loan/list'
import LoanOrder from '@/views/loan/order'
import LoanRecord from '@/views/loan/record'
import OperartionIndex from '@/views/operartion/index'
import OperartionDetail from '@/views/operartion/detail'
import SettingAccount from '@/views/setting/account'
import SettingChannel from '@/views/setting/channel'
import SettingChannelDetail from '@/views/setting/channelDetail'
import SettingCompany from '@/views/setting/company'
import SettingData from '@/views/setting/data'
import SettingFinance from '@/views/setting/finance'
import SettingPrice from '@/views/setting/price'
import SettingProduct from '@/views/setting/product'
import SettingProductDetail from '@/views/setting/productDetail'
import SettingContract from '@/views/setting/contract'
import SettingRoles from '@/views/setting/roles'
import OverdueIndex from '@/views/overdue/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/appRegister',
      name: 'appRegister',
      component: AppRegister
    },
    {
      path: '/appDownload',
      name: 'appDownLoad',
      component: AppDownload
    },
    {
      path: '/appBlank',
      name: 'appBlank',
      component: AppBlank
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'dashboard',
      redirect: '/dashboard',
      component: Common,
      children: [
        { path: '/dashboard', component: Dashboard }
      ]
    },
    {
      path: '/custom',
      name: 'custom',
      redirect: '/custom/index',
      component: Common,
      children: [
        { path: 'index', component: CustomIndex },
        { path: 'other', component: CustomOther }
      ]
    },
    {
      path: '/apply',
      name: 'apply',
      redirect: '/apply/list',
      component: Common,
      children: [
        { path: 'list', component: ApplyIndex }
      ]
    },
    {
      path: '/audit',
      name: 'audit',
      redirect: '/audit/index',
      component: Common,
      children: [
        { path: 'index', component: AuditIndex },
        { path: 'other', component: AuditOther }
      ]
    },
    {
      path: '/collection',
      name: 'collection',
      redirect: '/collection/index',
      component: Common,
      children: [
        { path: 'index', component: CollectionIndex }
      ]
    },
    {
      path: '/loan',
      name: 'loan',
      redirect: '/loan/list',
      component: Common,
      children: [
        { path: 'list', component: LoanList },
        { path: 'order', component: LoanOrder },
        { path: 'record', component: LoanRecord }
      ]
    },
    {
      path: '/operartion',
      name: 'operartion',
      redirect: '/operartion/index',
      component: Common,
      children: [
        { path: 'index', component: OperartionIndex },
        { path: 'detail', component: OperartionDetail }
      ]
    },
    {
      path: '/setting',
      name: 'setting',
      redirect: '/setting/account',
      component: Common,
      children: [
        { path: 'account', component: SettingAccount },
        { path: 'roles', component: SettingRoles },
        { path: 'channel', component: SettingChannel },
        { path: 'channelDetail', component: SettingChannelDetail },
        { path: 'company', component: SettingCompany },
        { path: 'data', component: SettingData },
        { path: 'finance', component: SettingFinance },
        { path: 'price', component: SettingPrice },
        { path: 'product', component: SettingProduct },
        { path: 'productDetail', component: SettingProductDetail },
        { path: 'contract', component: SettingContract }
      ]
    },
    {
      path: '/overdue',
      name: 'overdue',
      redirect: '/overdue/index',
      component: Common,
      children: [
        { path: 'index', component: OverdueIndex }
      ]
    }
  ]
})
