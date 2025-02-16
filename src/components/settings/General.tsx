import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Map from '../map/Map';
import { Plus, Trash2 } from 'lucide-react';
import { BaseKey, BaseRecord, useList, useUpdate } from '@refinedev/core'; // Import useUpdate
import loading from '../../assets/loading.png';

interface Restaurant {
  id: BaseKey,
  name: string,
  email: string,
  website: string,
  phone:string,
  location: string,
  address: string,
  is_approved: boolean,
  max_of_guests: number,
  description: string,
  allow_reservation: boolean,
  average_price: string,
  due_cancellation_period: number,
  buffer: string,
  created_at: string,
  edit_at: string,
  country: number,
  city: number,
  category: number,
  manager: number,
  restaurant_type: number,
  categories: [],
  staff: []
}

const General = () => {

  const [restaurantId, setRestaurantId] = useState(localStorage.getItem('restaurant_id'));

  const { data: restaurantData, isLoading, error } = useList({
    resource: `api/v1/bo/restaurants/${restaurantId}/current/`,
  });

  const [restaurant, setRestaurant] = useState<Restaurant>();

  useEffect(() => {
    if (restaurantData?.data) {
      setRestaurant(restaurantData.data as unknown as Restaurant);
    }
  }, [restaurantData]);




  const [citiesAPIInfo, setCitiesAPIInfo] =useState<BaseRecord[]>()


  const { data: allCities, isLoading: isLoadingAllCities, error: errorAllCities } = useList({
    resource: 'api/v1/bo/cities/',
    filters: [
      {
        field: 'country',
        operator: 'eq',
        value: 2,
      },
    ],
    queryOptions:{
      onSuccess(data){
        setCitiesAPIInfo(data.data as unknown as BaseRecord[])
      }
    }
  });


  const [countriesAPIInfo, setCountriesAPIInfo] =useState<BaseRecord[]>()

  const { data: allCountries, isLoading: isLoadingAllCountries, error: errorAllCountries } = useList({
    resource: 'api/v1/bo/countries/',
    queryOptions:{
      onSuccess(data){
        setCountriesAPIInfo(data.data as unknown as BaseRecord[])
        console.log(data.data)
      }
    }
    
  });

  const [formData, setFormData] = useState({
    name: restaurant?.name,
    email: restaurant?.email,
    city: restaurant?.city,
    country: restaurant?.country,
    average_price: restaurant?.average_price,
    description: restaurant?.description,
    phone: restaurant?.phone,
    website: restaurant?.website
  });

  useEffect(() => {
    if (restaurant) {
      setFormData({
        name: restaurant.name,
        email: restaurant.email,
        city: restaurant.city,
        average_price: restaurant.average_price,
        country: restaurant.country,
        description: restaurant.description,
        phone: restaurant.phone,
        website: restaurant.website
      });
    }
  }, [restaurant]);



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));

    
  };

  const [categories, setCategories] = useState(restaurant?.categories || ['']);

  const editCategory = (index: number, value: string) => {
    setCategories((prevCategories) => {
      const newCategories = [...prevCategories];
      newCategories[index] = value;
      return newCategories;
    });
  }

  const [editingCategoryIndex, setEditingCategoryIndex] = useState<number | null>(null);

  const categoryChangeToEdit = (index: number, value: string) => {
    return (
      <input
        type="text"
        className={`inputs ${localStorage.getItem('darkMode') === 'true' ? 'bg-darkthemeitems' : 'bg-white'}`}
        value={value}
        onChange={(e) => editCategory(index, e.target.value)}
        onBlur={() => setEditingCategoryIndex(null)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setEditingCategoryIndex(null);
          }
        }}
        autoFocus
      />
    )
  }

  const deleteCategory = (index: number) => {
    setCategories((prevCategories) => {
      const newCategories = [...prevCategories];
      newCategories.splice(index, 1);
      return newCategories;
    });
  }

  const { t } = useTranslation();

  // Use the useUpdate hook
  const { mutate: updateRestaurant } = useUpdate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    // Prepare the data to be updated
    const updatedData = {
      name: formData.name,
      email: formData.email,
      website: formData.website,
      phone: formData.phone,
      location: restaurant?.location || "string", // Use existing data or a placeholder
      address: restaurant?.address || "string", // Use existing data or a placeholder
      is_approved: restaurant?.is_approved || true, // Use existing data or a default
      // max_of_guests: restaurant?.max_of_guests || 2147483647, // Use existing data or a default
      description: formData.description,
      allow_reservation: restaurant?.allow_reservation || true, // Use existing data or a default
      average_price: formData.average_price,
      // due_cancellation_period: restaurant?.due_cancellation_period || 2147483647, // Use existing data or a default
      country: formData.country,
      city: formData.city,
      category: restaurant?.category || 0, // Use existing data or a default
      manager: restaurant?.manager || 0, // Use existing data or a default
      restaurant_type: restaurant?.restaurant_type || 0, // Use existing data or a default
      // categories: categories.length() === 0 ? 0 : categories?.map((cat) => parseInt(cat)), // Ensure categories are numbers
      staff: restaurant?.staff || [0], // Use existing data or a default
    };
  
    // Call the update mutation
    updateRestaurant({
      resource: "api/v1/bo/restaurants",
      values: updatedData,
      id: restaurantId + "/", // Ensure the ID is appended correctly
    });
    // window.location.reload();
  };

  return (
    <div className={`rounded-[10px] p-3 w-full ${localStorage.getItem('darkMode') === 'true' ? 'bg-bgdarktheme' : 'bg-white'}`}>
      <h2 className="text-center mb-3">{t('settingsPage.general.basicInformationForm.title')}</h2>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <div className="flex flex-row gap-3">
          <input
            type="text"
            id="name"
            placeholder={t('settingsPage.general.basicInformationForm.labels.restaurantName')}
            className={`inputs ${localStorage.getItem('darkMode') === 'true' ? 'bg-darkthemeitems' : 'bg-white'}`}
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            id="email"
            placeholder={t('settingsPage.general.basicInformationForm.labels.email')}
            className={`inputs ${localStorage.getItem('darkMode') === 'true' ? 'bg-darkthemeitems' : 'bg-white'}`}
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-row gap-3">
          <select
            id="country"
            className={`inputs w-1/2 ${localStorage.getItem('darkMode') === 'true' ? 'bg-darkthemeitems' : 'bg-white'}`}
            value={formData.country}
            onChange={handleSelectChange}
          >
            {countriesAPIInfo?.map((country:any) => (
              <option key={country.id} value={country.id}>
          {country.name}
              </option>
            ))}
          </select>
          <select
            id="city"
            className={`inputs w-1/2 ${localStorage.getItem('darkMode') === 'true' ? 'bg-darkthemeitems' : 'bg-white'}`}
            value={formData.city}
            onChange={handleSelectChange}
          >
            {citiesAPIInfo?.map((city:any) => (
              <option key={city.id} value={city.id}>
          {city.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-3">
          <textarea
            id="description"
            placeholder={t('settingsPage.general.basicInformationForm.labels.description')}
            className={`inputs ${localStorage.getItem('darkMode') === 'true' ? 'bg-darkthemeitems' : 'bg-white'}`}
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="flex flex-row gap-3">
          <input
            type="text"
            id="phone"
            placeholder={t('settingsPage.general.basicInformationForm.labels.phone')}
            className={`inputs ${localStorage.getItem('darkMode') === 'true' ? 'bg-darkthemeitems' : 'bg-white'}`}
            value={formData.phone}
            onChange={handleInputChange}
          />
          <input
            type="text"
            id="website"
            placeholder={t('settingsPage.general.basicInformationForm.labels.website')}
            className={`inputs ${localStorage.getItem('darkMode') === 'true' ? 'bg-darkthemeitems' : 'bg-white'}`}
            value={formData.website}
            onChange={handleInputChange}
          />
        </div>
        {/* <div className='flex flex-col gap-3'>
          <label>{t('settingsPage.general.basicInformationForm.labels.categories')}</label>
          {categories.map((category, index) => (
            <div key={category} className='w-full flex justify-between gap-3'>
              {editingCategoryIndex === index ? (
                categoryChangeToEdit(index, category)
              ) : (
                <div
                  onClick={() => setEditingCategoryIndex(index)}
                  className={`inputs ${localStorage.getItem('darkMode') === 'true' ? 'bg-darkthemeitems' : 'bg-white'}`}
                >
                  {category}
                </div>
              )}
              <button
                onClick={() => deleteCategory(index)}
                className="p-2 rounded bg-softredtheme text-redtheme hover:bg-transparent transition-colors"
                aria-label="Delete item"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
          {categories.length < 3 &&
            <div>
              <div className='flex gap-2 cursor-pointer items-center'
                onClick={() => setCategories((prevCategories) => [...prevCategories, ''])}
              >
                <Plus className="w-5 h-5" />
                {t('settingsPage.general.basicInformationForm.buttons.addcategory')}
              </div>
            </div>
          }
        </div> */}
        {/* <div className='relative gap-2 flex flex-col'>
          <label>{t('settingsPage.general.basicInformationForm.labels.avgPrice')}</label>
          <input
            type="number"
            placeholder={t('settingsPage.general.basicInformationForm.labels.avgPrice')}
            id="avgPrice"
            defaultValue={formData.average_price}
            onChange={handleInputChange}
            className={`inputs ${localStorage.getItem('darkMode') === 'true' ? 'bg-darkthemeitems' : 'bg-white'}`}
          />
          <div className="text-sm absolute mt-[3.2em] right-10">{t('settingsPage.general.basicInformationForm.labels.currency')}</div>
        </div> */}
        <div className="flex w-full justify-center gap-4">
          <button type="reset" className={`btn ${localStorage.getItem('darkMode') === 'true' ? 'border-white text-white hover:border-redtheme hover:text-redtheme' : ''}`}>{t('settingsPage.general.basicInformationForm.buttons.cancel')}</button>
          <button type="submit" className="btn-primary">{t('settingsPage.general.basicInformationForm.buttons.save')}</button>
        </div>
      </form>
    </div>
  );
};

export default General;