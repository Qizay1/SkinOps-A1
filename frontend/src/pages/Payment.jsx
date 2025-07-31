import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  CreditCard, 
  Wallet,
  Gift,
  Shield,
  Zap,
  Star,
  Plus,
  Smartphone,
  Globe
} from 'lucide-react';
import { mockUser } from '../mock';
import { useToast } from '../hooks/use-toast';

const Payment = () => {
  const [selectedAmount, setSelectedAmount] = useState(500);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('card');
  const { toast } = useToast();

  const predefinedAmounts = [
    { amount: 100, bonus: 0, popular: false },
    { amount: 500, bonus: 25, popular: true },
    { amount: 1000, bonus: 75, popular: false },
    { amount: 2500, bonus: 250, popular: false },
    { amount: 5000, bonus: 750, popular: true },
    { amount: 10000, bonus: 2000, popular: false }
  ];

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, American Express',
      fee: '2.9%',
      instant: true
    },
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      icon: Globe,
      description: 'Bitcoin, Ethereum, USDT',
      fee: '1%',
      instant: true
    },
    {
      id: 'mobile',
      name: 'Mobile Payment',
      icon: Smartphone,
      description: 'Apple Pay, Google Pay, Samsung Pay',
      fee: '2.5%',
      instant: true
    },
    {
      id: 'wallet',
      name: 'E-Wallet',
      icon: Wallet,
      description: 'PayPal, Skrill, Neteller',
      fee: '3.4%',
      instant: false
    }
  ];

  const handleDeposit = () => {
    const amount = customAmount || selectedAmount;
    const bonus = predefinedAmounts.find(p => p.amount === amount)?.bonus || 0;
    const total = amount + bonus;

    toast({
      title: "Deposit Successful!",
      description: `${amount}₽ deposited${bonus > 0 ? ` with ${bonus}₽ bonus` : ''}. Total: ${total}₽`,
    });

    // Mock balance update
    mockUser.balance += total;
  };

  const totalAmount = customAmount ? 
    parseInt(customAmount) || 0 : 
    selectedAmount + (predefinedAmounts.find(p => p.amount === selectedAmount)?.bonus || 0);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            Add <span className="text-orange-400">Funds</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Deposit funds to your SkinOps account and start opening cases. All transactions are secure and protected.
          </p>
        </div>

        {/* Current Balance */}
        <Card className="bg-gradient-to-r from-orange-900/20 to-orange-800/20 border-orange-500/30 mb-8">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Wallet className="w-6 h-6 text-orange-400" />
              <span className="text-gray-400">Current Balance</span>
            </div>
            <div className="text-3xl font-bold text-orange-400">
              {mockUser.balance.toLocaleString()}₽
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Amount Selection */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Plus className="w-5 h-5 mr-2 text-orange-400" />
                  Select Amount
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Predefined Amounts */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {predefinedAmounts.map((option) => (
                    <div
                      key={option.amount}
                      onClick={() => {
                        setSelectedAmount(option.amount);
                        setCustomAmount('');
                      }}
                      className={`relative p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedAmount === option.amount && !customAmount
                          ? 'border-orange-500 bg-orange-500/10'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      {option.popular && (
                        <Badge className="absolute -top-2 left-2 bg-orange-500 text-white text-xs">
                          Popular
                        </Badge>
                      )}
                      <div className="text-center">
                        <div className="text-xl font-bold text-white mb-1">
                          {option.amount.toLocaleString()}₽
                        </div>
                        {option.bonus > 0 && (
                          <div className="text-sm text-orange-400">
                            +{option.bonus}₽ bonus
                          </div>
                        )}
                        <div className="text-xs text-gray-400 mt-1">
                          Total: {(option.amount + option.bonus).toLocaleString()}₽
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="space-y-2">
                  <Label htmlFor="custom-amount" className="text-white">
                    Or enter custom amount (minimum 50₽)
                  </Label>
                  <Input
                    id="custom-amount"
                    type="number"
                    placeholder="Enter amount..."
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(0);
                    }}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-orange-400" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedMethod === method.id
                          ? 'border-orange-500 bg-orange-500/10'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <method.icon className="w-6 h-6 text-orange-400 mt-1" />
                        <div className="flex-1">
                          <h4 className="text-white font-medium mb-1">{method.name}</h4>
                          <p className="text-gray-400 text-sm mb-2">{method.description}</p>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">Fee: {method.fee}</span>
                            {method.instant && (
                              <Badge className="bg-green-600 text-white">
                                <Zap className="w-3 h-3 mr-1" />
                                Instant
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Deposit Amount:</span>
                  <span className="text-white font-medium">
                    {(customAmount || selectedAmount).toLocaleString()}₽
                  </span>
                </div>
                
                {!customAmount && selectedAmount > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Bonus:</span>
                    <span className="text-orange-400 font-medium">
                      +{(predefinedAmounts.find(p => p.amount === selectedAmount)?.bonus || 0).toLocaleString()}₽
                    </span>
                  </div>
                )}
                
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">Total Credit:</span>
                    <span className="text-orange-400 font-bold text-lg">
                      {totalAmount.toLocaleString()}₽
                    </span>
                  </div>
                </div>

                <Button 
                  onClick={handleDeposit}
                  disabled={!totalAmount || totalAmount < 50}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Secure Deposit
                </Button>
              </CardContent>
            </Card>

            {/* Security Features */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-green-400" />
                  Security & Safety
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">SSL Encrypted</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">PCI DSS Compliant</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Instant Processing</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">24/7 Support</span>
                </div>
              </CardContent>
            </Card>

            {/* Bonus Information */}
            <Card className="bg-gradient-to-r from-orange-900/20 to-orange-800/20 border-orange-500/30">
              <CardContent className="p-4 text-center">
                <Gift className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <h4 className="text-white font-medium mb-1">Deposit Bonus</h4>
                <p className="text-orange-400 text-sm">
                  Get up to 20% bonus on your deposits!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;