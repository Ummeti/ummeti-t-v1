'use client';

import { updateContactAction } from '@/app/actions/updateContactAction';
import { motion } from 'framer-motion';
import { useActionState, useEffect } from 'react';
import { useNotification } from '../context/NotificationContext';
import LocaleTabs from '../ui/LocaleTabs';
import { tabsConfig } from '../add/tabsConfig';
import SocialInputs from './SocialInputs';

export default function UpdateContactForm({ contact }) {
  const initialState = {
    success: false,
    message: '',
    errors: {},
    formObject: contact,
  };

  const [state, formAction, isPending] = useActionState(
    updateContactAction,
    initialState
  );

  const { showNotification } = useNotification();

  useEffect(() => {
    if (state.message) {
      showNotification({
        message: state.message,
        type: state.success ? 'success' : 'error',
      });
    }
  }, [state.message]);

  return (
    <div className="py-8">
      <h2 className="text-center text-gray-900 text-3xl font-bold">
        Contact Information
      </h2>
      <form
        action={formAction}
        className="mt-8 space-y-4 max-w-xl mx-auto bg-white p-6 shadow-lg rounded-lg"
        noValidate
      >
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            defaultValue={state.formObject?.email || contact?.email}
            className="w-full rounded-lg py-3 px-4 border border-gray-300 focus:ring-2 focus:ring-main focus:outline-none"
            disabled={isPending}
            required
          />
          {state.errors?.email && (
            <p className="text-red-500 text-sm mt-1">{state.errors.email}</p>
          )}
        </div>
        <div>
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            defaultValue={state.formObject?.phone || contact?.phone}
            className="w-full rounded-lg py-3 px-4 border border-gray-300 focus:ring-2 focus:ring-main focus:outline-none"
            disabled={isPending}
            required
          />
          {state.errors?.phone && (
            <p className="text-red-500 text-sm mt-1">{state.errors.phone}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            name="address"
            placeholder="Address"
            defaultValue={state.formObject?.address || contact?.address}
            className="w-full rounded-lg py-3 px-4 border border-gray-300 focus:ring-2 focus:ring-main focus:outline-none"
            disabled={isPending}
            required
          />
          {state.errors?.address && (
            <p className="text-red-500 text-sm mt-1">{state.errors.address}</p>
          )}
        </div>
        <div>
          <input
            type="url"
            name="location"
            placeholder="Location URL"
            defaultValue={state.formObject?.location || contact?.location}
            className="w-full rounded-lg py-3 px-4 border border-gray-300 focus:ring-2 focus:ring-main focus:outline-none"
            disabled={isPending}
          />
          {state.errors?.location && (
            <p className="text-red-500 text-sm mt-1">{state.errors.location}</p>
          )}
        </div>
        <LocaleTabs
          tabs={tabsConfig.locales.map((locale) => ({
            key: locale,
            label: locale.toUpperCase(),
            icon: tabsConfig.icons[locale],
            content: (
              <SocialInputs
                key={locale}
                lang={locale}
                state={state}
                isPending={isPending}
              />
            ),
          }))}
        />
        <motion.button
          type="submit"
          className="w-full text-white bg-main hover:bg-main-lighter rounded-lg px-4 py-3 flex items-center justify-center"
          whileTap={{ scale: 0.95 }}
          disabled={isPending}
        >
          {isPending ? 'Updating...' : 'Update Contact'}
        </motion.button>
        {state.message && (
          <p
            className={`text-sm mt-4 text-center ${
              state.success ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {state.message}
          </p>
        )}
      </form>
    </div>
  );
}
