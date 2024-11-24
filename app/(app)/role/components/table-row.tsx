import React, { useEffect, useState } from 'react'
import ChevronDown from '@/components/icons/chevron-down';
import { UnstyledButton, Button, Table, Checkbox, Switch, TextInput } from '@mantine/core';
import { MENU, permissionsValue } from '@/constants';
import EditIcon from '@/components/icons/edit';
import { RoleType } from '@/types/role.type';
import { z } from 'zod';
import Check from '@/components/icons/check';
import XMark from '@/components/icons/xmark';
import { updateRole } from '../actions';
import { notifications } from '@mantine/notifications';
import Trash from '@/components/icons/trash';
const user = {
  name: 'John Doe',
  role: 'ADM'
}
const formInfoSchema = z.object({
  name: z.string().min(6, {
    message: "Name must be at least 6 characters",
  }),
  description: z.string().optional(),
  permissions: z.object({}).optional(),
})

const initialValues: RoleType = {
  name: '',
  description: '',
  code: '',
  active: true,
  permissions: { dashboard: 0 }
}

const RoleTableRow = ({ item }: { item: any }) => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedRole, setSelectedRole] = useState(initialValues)

  useEffect(() => {
    if (user.role === 'ADM') {
      setIsAdmin(true)
    }
  }, [])
  const handleSubmit = async () => {
    const validation = formInfoSchema.safeParse(selectedRole)
    if (!validation.success) {
      const error = JSON.parse(validation.error.message)[0]
      notifications.show({
        title: 'Fail',
        message: error.message,
        color: 'red',
        position: 'top-right',
      })
      return
    }
    const data = {
      ...selectedRole,
      permissions: JSON.stringify(selectedRole.permissions),
      id: item.id
    }
    const res = await updateRole(data)
    notifications.show({
      title: res.status === 200 ? 'Success' : "Failed",
      message: res.status === 200 ? 'Role updated successfully' : res.message,
      color: res.status === 200 ? 'green' : 'red',
      position: 'top-right',
    })
  }
  const handleAssignPermission = (menu: string, value: number, isChecked: boolean) => {
    const permissions = selectedRole.permissions
    if (isChecked) {
      permissions[menu] |= value
    } else {
      permissions[menu] &= (~value)
    }
    setSelectedRole({ ...selectedRole, permissions })
  }
  return (
    <>
      <Table.Tr>
        <Table.Td colSpan={5}>
          <Table
            classNames={{
              thead: 'bg-gray-100 font-semibold text-black',
            }}>
            <Table.Tbody>
              <Table.Tr className='flex'>
                <Table.Td className='w-[12rem] text-center'>
                  {!isEditing
                    ? item.name
                    : <TextInput
                      withAsterisk
                      type='text'
                      placeholder="Enter role name"
                      classNames={{ root: 'w-full' }}
                      value={selectedRole.name}
                      onChange={(e) => setSelectedRole({ ...selectedRole, name: e.target.value })}
                    />
                  }
                </Table.Td>
                <Table.Td className='w-[10rem] text-center'>{item.code}</Table.Td>
                <Table.Td className='w-[10rem] text-center'>
                  <Switch
                    color='teal'
                    checked={item.active}
                    disabled={!isEditing}
                  />
                </Table.Td>
                <Table.Td className='grow text-center'>
                  {!isEditing
                    ? item.description
                    : <TextInput
                      withAsterisk
                      type='text'
                      placeholder="Enter role description"
                      classNames={{ root: 'w-full' }}
                      value={selectedRole.description}
                      onChange={(e) => {
                        setSelectedRole({ ...selectedRole, description: e.target.value })
                      }}
                    />
                  }
                </Table.Td>
                <Table.Td className='w-[8rem] text-center'>
                  <Button
                    variant='transparent'
                    onClick={() => setShowMore(!showMore)}>
                    <ChevronDown className='size-6 text-teal-600' />
                  </Button>
                </Table.Td>
                <Table.Td className='w-[8rem] text-center'>
                  {
                    !isEditing
                      ? <UnstyledButton
                        variant='transparent'
                        onClick={() => {
                          setSelectedRole(item)
                          setIsEditing(!isEditing)
                        }}
                        disabled={!isAdmin && item.code === 'ADM'}>
                        <EditIcon className={`size-6 ${(!isAdmin && item.code === 'ADM') ? 'text-gray-300 cursor-default' : 'text-teal-600'}`} />
                      </UnstyledButton>
                      : <div className='flex gap-2 justify-center items-center'>
                        <UnstyledButton
                          variant='transparent'
                          onClick={() => {
                            handleSubmit()
                            setIsEditing(!isEditing)
                          }}>
                          <Check className='size-6 text-teal-600' />
                        </UnstyledButton>
                        <UnstyledButton
                          variant='transparent'
                          onClick={() => {
                            setSelectedRole(initialValues)
                            setIsEditing(!isEditing)
                          }}>
                          <XMark className='size-6 text-teal-600' />
                        </UnstyledButton>
                      </div>
                  }
                </Table.Td>
                <Table.Td className='w-[8rem] text-center'>
                  <Button
                    variant='transparent'
                    onClick={() => setShowMore(!showMore)}>
                    <Trash className='size-6 text-red-600' />
                  </Button>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                {showMore &&
                  <Table.Td colSpan={7} className='bg-gray-100'>
                    <div className='max-h-[300px] flex flex-col gap-2'>
                      {
                        MENU.map((menu) => {
                          const permissions = item.permissions[menu.key]
                          return (
                            <div className='flex gap-2' key={menu.key}>
                              <h3 className='font-semibold text-md min-w-[6rem]'>{menu.title}</h3>
                              <div className='flex gap-2 px-3'>
                                {/* {formInfo.getValues().permissions[menu.key]} */}
                                {
                                  menu.permissions.map((permission) => {
                                    const _permission = permissionsValue[permission as keyof typeof permissionsValue]
                                    return (
                                      <div key={permission}>
                                        <Checkbox
                                          color='teal'
                                          checked={!!(permissions & _permission)}
                                          disabled={!isEditing}
                                          onChange={(e) => handleAssignPermission(menu.key, _permission, e.target.checked)}
                                          label={permission}
                                        />

                                      </div>
                                    )
                                  })
                                }
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  </Table.Td>
                }
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </Table.Td>
      </Table.Tr>
    </>
  )
}

export default RoleTableRow