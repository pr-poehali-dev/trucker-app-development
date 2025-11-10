import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Slider } from '@/components/ui/slider';

interface Driver {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  reviews: number;
  truckType: string;
  pricePerKm: number;
  verified: boolean;
  location: string;
}

interface Cargo {
  id: number;
  from: string;
  to: string;
  distance: number;
  weight: number;
  suggestedPrice: number;
  cargoType: string;
  urgent: boolean;
}

const Index = () => {
  const [searchFrom, setSearchFrom] = useState('');
  const [searchTo, setSearchTo] = useState('');
  const [distance, setDistance] = useState([500]);
  const [calculatedPrice, setCalculatedPrice] = useState(0);

  const drivers: Driver[] = [
    {
      id: 1,
      name: 'Алексей Петров',
      avatar: 'https://cdn.poehali.dev/projects/690c027d-da40-48e9-b3a5-ff6325ea5b48/files/188dd0c2-190a-4a09-8cc1-f987861f49ce.jpg',
      rating: 4.9,
      reviews: 234,
      truckType: 'Фура 20т',
      pricePerKm: 45,
      verified: true,
      location: 'Москва'
    },
    {
      id: 2,
      name: 'Дмитрий Сидоров',
      avatar: 'https://cdn.poehali.dev/projects/690c027d-da40-48e9-b3a5-ff6325ea5b48/files/188dd0c2-190a-4a09-8cc1-f987861f49ce.jpg',
      rating: 4.7,
      reviews: 189,
      truckType: 'Грузовик 10т',
      pricePerKm: 38,
      verified: true,
      location: 'Санкт-Петербург'
    },
    {
      id: 3,
      name: 'Иван Козлов',
      avatar: 'https://cdn.poehali.dev/projects/690c027d-da40-48e9-b3a5-ff6325ea5b48/files/188dd0c2-190a-4a09-8cc1-f987861f49ce.jpg',
      rating: 4.8,
      reviews: 156,
      truckType: 'Фургон 5т',
      pricePerKm: 32,
      verified: true,
      location: 'Казань'
    }
  ];

  const cargos: Cargo[] = [
    {
      id: 1,
      from: 'Москва',
      to: 'Новосибирск',
      distance: 3300,
      weight: 18,
      suggestedPrice: 148500,
      cargoType: 'Стройматериалы',
      urgent: false
    },
    {
      id: 2,
      from: 'Санкт-Петербург',
      to: 'Екатеринбург',
      distance: 2100,
      weight: 12,
      suggestedPrice: 79800,
      cargoType: 'Оборудование',
      urgent: true
    },
    {
      id: 3,
      from: 'Казань',
      to: 'Ростов-на-Дону',
      distance: 1400,
      weight: 8,
      suggestedPrice: 44800,
      cargoType: 'Продукты',
      urgent: false
    }
  ];

  const calculatePrice = () => {
    const basePrice = distance[0] * 42;
    setCalculatedPrice(basePrice);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name="Truck" className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ГрузВезёт
            </h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-gray-700 hover:text-primary transition-colors">Главная</a>
            <a href="#" className="text-gray-700 hover:text-primary transition-colors">Поиск</a>
            <a href="#" className="text-gray-700 hover:text-primary transition-colors">О нас</a>
            <Button>Войти</Button>
          </nav>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Icon name="Menu" size={24} />
          </Button>
        </div>
      </header>

      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://cdn.poehali.dev/projects/690c027d-da40-48e9-b3a5-ff6325ea5b48/files/4707c06d-ac70-4125-9e94-7a51ebc1ec25.jpg"
            alt="Truck"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
        </div>
        <div className="container mx-auto px-4 z-10 text-center animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Грузоперевозки<br />по всей России
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Находите водителей и грузы напрямую. Договаривайтесь о цене сами, как в InDriver
          </p>
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto bg-white rounded-2xl p-6 shadow-2xl">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Откуда</label>
              <div className="relative">
                <Icon name="MapPin" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <Input 
                  placeholder="Город отправления" 
                  className="pl-10 h-12"
                  value={searchFrom}
                  onChange={(e) => setSearchFrom(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Куда</label>
              <div className="relative">
                <Icon name="MapPin" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <Input 
                  placeholder="Город назначения" 
                  className="pl-10 h-12"
                  value={searchTo}
                  onChange={(e) => setSearchTo(e.target.value)}
                />
              </div>
            </div>
            <Button className="h-12 md:mt-[26px] bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
              <Icon name="Search" className="mr-2" size={20} />
              Найти
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <Tabs defaultValue="drivers" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="drivers" className="text-base">
              <Icon name="User" className="mr-2" size={18} />
              Водители
            </TabsTrigger>
            <TabsTrigger value="cargos" className="text-base">
              <Icon name="Package" className="mr-2" size={18} />
              Грузы
            </TabsTrigger>
          </TabsList>

          <TabsContent value="drivers" className="animate-fade-in">
            <h3 className="text-3xl font-bold text-center mb-8">Проверенные водители</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {drivers.map((driver, index) => (
                <Card 
                  key={driver.id} 
                  className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/20"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Avatar className="w-16 h-16 border-2 border-primary/20">
                        <AvatarImage src={driver.avatar} />
                        <AvatarFallback>{driver.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">{driver.name}</CardTitle>
                          {driver.verified && (
                            <Badge variant="secondary" className="bg-green-100 text-green-700">
                              <Icon name="CheckCircle" size={14} className="mr-1" />
                              Проверен
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="mt-1 flex items-center gap-1">
                          <Icon name="MapPin" size={14} />
                          {driver.location}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Рейтинг</span>
                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                          <span className="font-semibold">{driver.rating}</span>
                          <span className="text-sm text-gray-500">({driver.reviews})</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Транспорт</span>
                        <span className="font-semibold">{driver.truckType}</span>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t">
                        <span className="text-sm text-gray-600">Цена за км</span>
                        <span className="text-xl font-bold text-primary">{driver.pricePerKm} ₽</span>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                        Предложить цену
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cargos" className="animate-fade-in">
            <h3 className="text-3xl font-bold text-center mb-8">Доступные грузы</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cargos.map((cargo, index) => (
                <Card 
                  key={cargo.id}
                  className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-secondary/20"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Icon name="Package" className="text-secondary" size={20} />
                          {cargo.cargoType}
                        </CardTitle>
                        <CardDescription className="mt-2 space-y-1">
                          <div className="flex items-center gap-2">
                            <Icon name="MapPin" size={14} className="text-green-600" />
                            <span>{cargo.from}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Icon name="MapPin" size={14} className="text-red-600" />
                            <span>{cargo.to}</span>
                          </div>
                        </CardDescription>
                      </div>
                      {cargo.urgent && (
                        <Badge variant="destructive" className="animate-pulse">
                          Срочно
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Расстояние</span>
                        <span className="font-semibold">{cargo.distance} км</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Вес груза</span>
                        <span className="font-semibold">{cargo.weight} тонн</span>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t">
                        <span className="text-sm text-gray-600">Предложенная цена</span>
                        <span className="text-xl font-bold text-secondary">
                          {cargo.suggestedPrice.toLocaleString()} ₽
                        </span>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-secondary to-primary hover:opacity-90">
                        Предложить цену
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <section className="py-16 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-8">Калькулятор стоимости</h3>
          <Card className="max-w-2xl mx-auto shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Calculator" className="text-primary" />
                Рассчитайте стоимость доставки
              </CardTitle>
              <CardDescription>
                Введите расстояние и получите примерную стоимость
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-3">
                  Расстояние: {distance[0]} км
                </label>
                <Slider
                  value={distance}
                  onValueChange={setDistance}
                  max={5000}
                  min={10}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>10 км</span>
                  <span>5000 км</span>
                </div>
              </div>
              <Button 
                onClick={calculatePrice} 
                className="w-full bg-gradient-to-r from-primary to-secondary"
                size="lg"
              >
                <Icon name="Calculator" className="mr-2" />
                Рассчитать стоимость
              </Button>
              {calculatedPrice > 0 && (
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg text-center animate-scale-in">
                  <p className="text-sm text-gray-600 mb-2">Примерная стоимость</p>
                  <p className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {calculatedPrice.toLocaleString()} ₽
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    ~{Math.round(calculatedPrice / distance[0])} ₽/км
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <h3 className="text-3xl font-bold text-center mb-12">Как это работает</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Search" size={32} className="text-white" />
              </div>
              <CardTitle>1. Найдите</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Выберите груз или водителя по нужному маршруту
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="MessageSquare" size={32} className="text-white" />
              </div>
              <CardTitle>2. Договоритесь</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Предложите свою цену и обсудите детали в чате
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="CheckCircle" size={32} className="text-white" />
              </div>
              <CardTitle>3. Отправьте груз</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Отслеживайте груз в реальном времени на карте
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Icon name="Truck" size={24} />
                ГрузВезёт
              </h4>
              <p className="text-gray-400 text-sm">
                Платформа для поиска грузов и водителей по всей России
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Компания</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-primary transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Вакансии</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Блог</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Поддержка</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-primary transition-colors">Помощь</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Документы</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-primary transition-colors">Условия использования</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Политика конфиденциальности</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2024 ГрузВезёт. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
