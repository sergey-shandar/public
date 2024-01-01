struct Closure<F> {
    data: (u8, u16),
    func: F,
}

impl<F: Fn(&(u8, u16)) -> &u8> Closure<F> {
    fn call_0(&self) -> &u8 {
        (self.func)(&self.data)
    }
}

// HRTB with explicit lifetime

impl<F: for<'a> Fn(&'a (u8, u16)) -> &'a u8> Closure<F> {
    fn call_1(&self) -> &u8 {
        (self.func)(&self.data)
    }
}

// HRTB for MyFn trait

trait MyFn<Args> {
    type Output;
    fn call(&self, args: Args) -> Self::Output;
}

impl<F: for<'a> MyFn<&'a (u8, u16), Output = &'a u8>> Closure<F> {
    fn call_2(&self) -> &u8 {
        self.func.call(&self.data)
    }
}

fn do_it(data: &(u8, u16)) -> &u8 {
    &data.0
}

struct DoIt();

impl<'a> MyFn<&'a (u8, u16)> for DoIt {
    type Output = &'a u8;
    fn call(&self, args: &'a (u8, u16)) -> Self::Output {
        &args.0
    }
}

fn main() {
    {
        let clo = Closure {
            data: (0, 1),
            func: do_it,
        };
        println!("{}", clo.call_0());
        println!("{}", clo.call_1());
    }
    {
        let clo = Closure {
            data: (0, 1),
            func: DoIt(),
        };
        println!("{}", clo.call_2());
    }
}
