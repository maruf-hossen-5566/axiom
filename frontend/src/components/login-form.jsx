import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Link} from "react-router-dom";
import {useLocation} from "react-router-dom";
import {Loader2} from "lucide-react";


export function LoginForm({className, loading, data, setData, error, setError, handleSubmit, ...props}) {
    const location = useLocation()
    const isLoginPage = location?.pathname.includes("login") || location?.pathname === "/login"


    const handleChange = (e) => {
        const {name, value} = e.target
        setData((prev) => ({
            ...prev, [name]: value
        }))
        setError((prev => ({
            ...prev, [name]: []
        })))
    }

    return (
        <form
            className={cn("flex flex-col gap-6", className)} {...props}
            onSubmit={(e) => handleSubmit(e)}
        >
            <div className="flex flex-col items-center gap-2 text-center">
                {
                    isLoginPage ?
                        <>
                            <h1 className="text-2xl font-bold">Login to your account</h1>
                            <p className="text-muted-foreground text-sm text-balance">
                                Enter your email below to login to your account
                            </p>
                        </>
                        :
                        <>
                            <h1 className="text-2xl font-bold">Create your account</h1>
                            <p className="text-muted-foreground text-sm text-balance">
                                Enter your credentials below to register your account
                            </p>
                        </>
                }
            </div>
            <div className="grid gap-6">
                {
                    !isLoginPage &&
                    <>
                        <div className="grid gap-3">
                            <Label htmlFor="full_name">Full name</Label>
                            <Input
                                className={(error && error?.full_name?.length > 0) && "border-destructive"}
                                value={data?.full_name}
                                onChange={(e) => handleChange(e)}
                                name="full_name"
                                id="full_name"
                                type="text"
                                placeholder="John Doe"
                                required
                            />
                            {
                                (error && error?.full_name?.length > 0) &&
                                <p className={"w-full text-center text-xs text-destructive"}>{error?.full_name[0]}</p>
                            }
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                className={(error && error?.username?.length > 0) && "border-destructive"}
                                value={data?.username}
                                onChange={(e) => handleChange(e)}
                                name="username"
                                id="username"
                                type="text"
                                placeholder="john_doe"
                                required
                            />
                            {
                                (error && error?.username?.length > 0) &&
                                <p className={"w-full text-center text-xs text-destructive"}>{error?.username[0]}</p>
                            }
                        </div>
                    </>
                }
                <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        className={(error && error?.email?.length > 0) && "border-destructive"}
                        value={data?.email}
                        onChange={(e) => handleChange(e)}
                        name="email"
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                    />
                    {
                        (error && error?.email?.length > 0) &&
                        <p className={"w-full text-center text-xs text-destructive"}>{error?.email[0]}</p>
                    }
                </div>
                <div className="grid gap-3">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                    </div>
                    <Input
                        className={(error && error?.password?.length > 0) && "border-destructive"}
                        value={data?.password}
                        onChange={(e) => handleChange(e)}
                        name="password"
                        id="password"
                        type="password"
                        required
                    />
                    {
                        (error && error?.password?.length > 0) &&
                        <p className={"w-full text-center text-xs text-destructive"}>{error?.password[0]}</p>
                    }
                </div>
                <Button
                    type="submit"
                    className="w-full"
                    disabled={loading}
                >
                    {
                        loading ?
                            <Loader2 className={"animate-spin"}/>
                            :
                            isLoginPage ? "Login" : "Signup"
                    }
                </Button>
                <div
                    className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t"
                >
                      <span className="bg-background text-muted-foreground relative z-10 px-2">
                        Or
                      </span>
                </div>
            </div>
            <div className="text-center text-sm">
                {
                    isLoginPage ?
                        <>
                            Don&apos;t have an account?{" "}
                            <Link
                                to={"/signup"}
                                className="underline underline-offset-4"
                            >
                                Sign up
                            </Link>
                        </>
                        :
                        <>
                            Already have an account?{" "}
                            <Link
                                to={"/login"}
                                className="underline underline-offset-4"
                            >
                                Login
                            </Link>
                        </>
                }
            </div>
        </form>
    );
}
