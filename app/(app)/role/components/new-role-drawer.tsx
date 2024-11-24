'use client'
import {
  Drawer, TagsInput,
  Button, Skeleton,
  TextInput, Select, Textarea,
  Card, Checkbox
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { permissionsValue, MENU } from '@/constants';
import { RoleType } from '@/types/role.type';
import { createRole } from '@/app/(app)/role/actions';
import { notifications } from '@mantine/notifications';

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
const NewRole = () => {
  const [opened, setOpened] = useState(false);
  const [permissions, setPermissions] = useState({
    access: false,
    edit: false,
    delete: false
  })
  const formInfo = useForm({
    mode: 'controlled',
    initialValues: initialValues,
    validate: zodResolver(formInfoSchema),
  });

  const handleSubmit = async (values: z.infer<typeof formInfoSchema>) => {
    values.permissions = JSON.stringify(values.permissions)
    const res = await createRole(values)
    notifications.show({
      title: res.status === 200 ? 'Success' : "Failed",
      message: res.status === 200 ? 'Role created successfully' : res.message,
      color: res.status === 200 ? 'green' : 'red',
      position: 'top-right',
    })
  }
  const handleAssignPermission = (menu: string, permission: number, action: boolean) => {
    const permissions = formInfo.getValues().permissions
    if (action) {
      permissions[menu] |= permission
    } else {
      permissions[menu] &= (~permission)
    }

    formInfo.setValues({ ...formInfo.getValues(), permissions })
  }
  useEffect(() => {
    const localUser = localStorage.getItem('user')
    if (localUser) {
      const user = JSON.parse(localUser)
      const _permissions = {
        access: !!(user.permissions & permissionsValue.ACCESS),
        edit: !!(user.permissions & permissionsValue.EDIT),
        delete: !!(user.permissions & permissionsValue.DELETE)
      }
      setPermissions(_permissions)
    }
  }, [])
  return (
    <div>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        position='right'
        size={'lg'}
        classNames={{
          root: 'px-2 pt-2 relative'
        }}
        title={<p className='font-bold text-xl'>Add New Role</p>}>
        <form
          key='productForm'
          onSubmit={formInfo.onSubmit(handleSubmit)}
          className='flex flex-col gap-3 items-center h-[calc(100%-60px)] overflow-y-auto'>
          <Card
            shadow="sm"
            radius="md"
            withBorder
            classNames={{
              root: 'w-full p-2'
            }}>
            <TextInput
              withAsterisk
              label="Role name"
              type='text'
              placeholder="Enter role name"
              classNames={{ root: 'w-full' }}
              key={formInfo.key('name')}
              {...formInfo.getInputProps('name')}
            />
            <TextInput
              withAsterisk
              label="Role code"
              type='text'
              placeholder="Enter code"
              classNames={{ root: 'w-full' }}
              key={formInfo.key('code')}
              {...formInfo.getInputProps('code')}
            />
            <Textarea
              label="Description"
              resize="vertical"
              placeholder="description"
              classNames={{ root: 'w-full' }}
              key={formInfo.key('description')}
              {...formInfo.getInputProps('description')}
            />
          </Card>
          <Card
            shadow="sm"
            radius="md"
            withBorder
            classNames={{
              root: 'w-full p-2'
            }}>
            <h3 className='text-lg font-semibold mb-3'>Permissions</h3>
            <div className='flex flex-col gap-2'>
              {
                MENU.map((menu) => {
                  const permissions = formInfo.getValues().permissions[menu.key]
                  return (
                    <div className='flex flex-col gap-2' key={menu.key}>
                      <h3 className='font-semibold text-md'>{menu.title}</h3>
                      <div className='flex gap-2 px-3'>
                        {/* {formInfo.getValues().permissions[menu.key]} */}
                        {
                          menu.permissions.map((permission) => {
                            const _permission = permissionsValue[permission as keyof typeof permissionsValue]
                            return (
                              <div key={permission}>
                                <Checkbox
                                  checked={!!(permissions & _permission)}
                                  onChange={(e) => handleAssignPermission(menu.key, _permission, e.currentTarget.checked)}
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
          </Card>
        </form>
        <footer className='sticky bottom-0 left-0 w-full flex justify-end gap-1 py-2 px-4 bg-white'>
          <Button color='gray' variant='light' type='button' onClick={() => setOpened(false)}>Close</Button>
          <Button color='teal' onClick={() => handleSubmit(formInfo.getValues())}>Save</Button>
        </footer>
      </Drawer>
      <Button
        color='teal'
        onClick={() => setOpened(true)}
        disabled={!permissions.edit}>
        Add new role
      </Button>
    </div >
  )
}

export default NewRole