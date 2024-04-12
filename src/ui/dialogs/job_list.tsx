import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Input, Link, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Divider, Spinner } from "@nextui-org/react";
import { ArrowDownIcon, PencilIcon, TrashIcon } from "../../_components/svg_components";
import { JobData, JobDataConvert } from "../../interface/response/dashboard_data";
import { LocalStorageService } from "../../service/local_storage";
import { toFormData } from "axios";
import { LocalStoragekey } from "../../_constants/enums";
import { axiosInstance } from "../../service/axios_conf";
import ConfirmDialog from "./confirm_dialog";


interface JobListProps {
  onClose?: () => void,
  isOpen: boolean,
}

export function JobList(props: JobListProps) {
  const { isOpen, onOpenChange } = useDisclosure({
    isOpen: props.isOpen,
    onClose: props.onClose,
  });

  const [listener, setListener] = useState<string>('');
  const [jobTitle, setJobTitle] = useState<string>('');
  const [jobDataList, setJobDataList] = useState<JobData[]>();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingAddJob, setIsLoadingAddJob] = useState<boolean>(false);

  const [confirmDialog, setCofirmDialog] = useState({
    isOpen: false,
    isYes: false,
    isNo: false,
    jobId: '',
  });



  async function handleCreateJobTitle() {
    if (jobTitle !== '') {
      setIsLoadingAddJob(true);
      await axiosInstance.post(`company/create-job-title`, toFormData({
        name: jobTitle,
      }))
        .then((response) => {
          console.log({ response });

          if (response.data.data) {
            setJobTitle('');
            setListener(`create-listen ${999 + Math.random() * 1000}`);

          }
        }).catch((e) => e);
      setIsLoadingAddJob(false);
    }
  }

  async function handleDeleteJobTitle() {
    setIsLoading(true);
    await axiosInstance.post(`company/job-title/${confirmDialog.jobId}`)
      .then((response) => {
        if (response.data) {
          setListener(`delete-listen ${999 + Math.random() * 1000}`);

        }
      }).catch((e) => e);
    setCofirmDialog({
      isYes: true,
      isNo: false,
      isOpen: false,
      jobId: '',
    })
    setIsLoading(false);
  }

  async function fetchAllJobTitle() {
    setIsLoading(true);
    await axiosInstance.get(`company/job-title-list`)
      .then((response) => {
        const data: JobData[] = [];
        response.data.data.forEach((element: any) => {
          data.push(JobDataConvert.toJobData(JSON.stringify(element)))
        });
        setJobDataList(data)
      }).catch((e) => e)
    setIsLoading(false);
  }

  useEffect(() => {
    fetchAllJobTitle()
  }, [listener])




  return (
    <>

      {/* <Button onPress={onOpen} color="primary">Open Modal</Button> */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop="blur"
        isDismissable={false}
        size="2xl"
        scrollBehavior="inside"

      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-black text-center"></ModalHeader>
              <ModalBody>
                {/* <Input
                    label="Location"
                    variant="flat"
                    type="text"
                    className="shadow-md rounded-xl"
                  /> */}

                <Divider className="my-2 h-[0.12em] bg-[#4269E1] mt-5" />
                <div className="sm:flex gap-4 ">
                  <Input
                    label="Jobbezeichnung hinzufügen"
                    variant="flat"
                    type="text"
                    value={jobTitle}
                    onChange={(e => {
                      setJobTitle(e.target.value)
                    })}
                    isReadOnly={isLoadingAddJob}
                    className="shadow-md rounded-xl w-full mb-3"
                  />
                  <Button
                    size="lg"
                    isIconOnly
                    isLoading={isLoadingAddJob}
                    onPress={handleCreateJobTitle}
                    className="text-3xl pb-1 text-white bg-[#4269E1]">
                    +
                  </Button>
                </div>

                {isLoading &&
                  <div className="flex gap-4 items-center justify-center py-2">
                    <p className="text-black">Fetching Update</p>
                    <Spinner size="sm" />
                  </div>
                }

                {jobDataList?.map((e) => <div className="sm:flex gap-4 ">
                  <Input
                    variant="flat"
                    type="text"
                    isReadOnly
                    size="lg"
                    value={e.name}
                    className="shadow-md rounded-xl w-full mb-3"
                  />
                  <Button
                    size="lg"
                    isIconOnly
                    onPress={() => {
                      setCofirmDialog({
                        isNo: false,
                        isYes: false,
                        isOpen: true,
                        jobId: `${e.id}`,
                      });
                    }}
                    className="text-3xl text-white bg-red-600">
                    <TrashIcon width="20" height="20" />
                  </Button>
                </div>
                )}

              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      {confirmDialog.isOpen && <ConfirmDialog
        icon={<>
          <div className="bg-red-500 p-4 rounded-full w-fit mt-3">
            <TrashIcon width="30" height="30" />
          </div>
        </>}

        title="Delete Job Title ?"
        message={'Are you sure you want to delete this Job ?'}
        onNo={() => {
          setCofirmDialog({
            isYes: false,
            isNo: true,
            isOpen: false,
            jobId: '',
          })
        }}
        isLoading={isLoading}
        onYes={handleDeleteJobTitle}
      />}
    </>
  );
}
