import React from 'react'
import DashboardReport from '../components/dashboardDosen/DashboardDosenReport'
import DashboardRecentQuestion from '../components/dashboardDosen/DashboardDosenRecentQuestion'
import DashboardLikesStat from '..//components/dashboardDosen/DashboardDosenLikesStat'
import DashboardCourseList from  '../components/dashboardDosen/DashboardDosenCourseList'
import DashboardQuizList from '../components/dashboardDosen/DashboardDosenQuizList'

const Home = () => {
  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      <div className='col-span-2 ml-16'>
        <div className="flex flex-wrap lg:flex-nowrap justify-center mb-8">
          <DashboardReport/>
        </div>
        <div className="flex flex-wrap lg:flex-nowrap justify-center mb-8">
          <DashboardLikesStat/>
        </div>
        <div className="flex flex-wrap lg:flex-nowrap justify-center my-8">
          <DashboardCourseList/>
        </div>
        <div className="flex flex-wrap lg:flex-nowrap justify-center my-8">
          <DashboardQuizList/>
        </div>
      </div>
      <div className='col-span-1 ml-12'>
        <div className="sticky top-0">
          <DashboardRecentQuestion/>
        </div>
      </div>
    </div>
  )
}

export default Home
