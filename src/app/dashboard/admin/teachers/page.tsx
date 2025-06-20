"use client";

import Axios from "@/app/lib/axios";
import { StudentInfoCard } from "@/app/lib/definitions";
import AddUser from "@/app/ui/Admin/AddUser";
import StudentCard from "@/app/ui/Admin/StudentCard";
import Pagination from "@/app/ui/Teacher/Pagination";
import { Skeleton } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Col, Row, Stack } from "react-bootstrap";


export default function TeachersPage() {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const [totalPages , setTotalPages] = useState<number | null>(null);
  const [refresh , setRefresh] = useState<boolean>(false);
  const [students , setStudents] = useState<StudentInfoCard[] >([]);
      const [isPendding , setIsPendding] = useState<boolean >(true);
  
  useEffect(()=>{
      try{
        setIsPendding(true)
        Axios.get(`/admin/get-teachers`,{params:{per_page:10 , page_number:currentPage }}).then(response =>{
          console.log("teachers :",response)
          if(response.data.success){
        setIsPendding(false)
            setTotalPages(response.data.meta.last_page);
            setStudents(response.data.data);
          }
      })}catch(error){
        console.log(error)
      }
    },[refresh])

  return (
    <>
      <Row className="mx-0">
        {isPendding?
                  [...Array(10)].map((_, i) => (
                    <Col  lg="6" md="12" key={i} className="mt-4">
                      <Row className="mx-0 user_card_out shadow">
                          <Col lg="3" md="12">
                              <div className="d-flex justify-content-center align-items-center h-100" >
                              <Stack spacing={1} className=" p-2 h-100">
                                <div className="d-flex justify-content-center" >
                                  <Skeleton variant="circular" width={100}  height={100}  sx={{ bgcolor: '#f2f6fd' }}/>
                                </div>
                              </Stack>        
                              </div>
                          </Col>
                          <Col lg="9" md="12" className="d-flex justify-content-start align-items-center">
                              <div className="line"></div>
                              <div className="user_card_in">
                                  <Stack spacing={1} className=" p-2 h-100">
                                    <Skeleton variant="text" width={400} sx={{ fontSize: '1rem' }} />
                                    <Skeleton variant="text" width={400} sx={{ fontSize: '1rem' }} />
                                    <Skeleton variant="text" width={400} sx={{ fontSize: '1rem' }} />
                                </Stack>
                              </div>
                          </Col>
                      </Row>
                    </Col>  
                  ))
                :""}
        {students.map((e,i)=>{
            return(
                <Col  lg="6" md="12" key={i} className="mt-4">
                    <StudentCard type={"teachers"} studentInfo={e} refresh={refresh} onChange={setRefresh}/>
                </Col>
            )
        })}
        <Col  lg="6" md="12" className=" d-flex align-items-center mt-2">
          <AddUser type={"teachers"} refresh={refresh} onChange={setRefresh}/> 
        </Col>  
      </Row>
    {totalPages && <Pagination  totalPages={totalPages}/>}
    {/* <div className="d-flex justify-content-center mt-5" >
    <Pagination  totalPages={4}/>
    </div> */}
    </>
  )
}
